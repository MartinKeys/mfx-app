import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as THREE from 'three';
import { GLTFLoader, DRACOLoader } from 'three-stdlib';
import { ConstructionCalcService } from './construction-calc.service';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

// Import interfaces
import { SceneConfig } from '../interfaces/scene-config';
import { ConsoleConfig } from '../interfaces/console-config';
import { LengthConfig } from '../interfaces/length-config';
import { ModelsConfig } from '../interfaces/models-config';
import { ModelConfig } from '../interfaces/model-config';
import { Vector3 } from '../interfaces/vector3';

@Injectable({
  providedIn: 'root'
})
export class ThreejsService {

  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private animationFrameId: number;
  private loader: GLTFLoader;
  private dracoLoader: DRACOLoader;

  private modelsConfig: ModelsConfig;
  private sceneConfig: SceneConfig;

  private loadedModels: { [key: string]: THREE.Group } = {};

  constructor(
    private ngZone: NgZone,
    private calcService: ConstructionCalcService,
    private http: HttpClient
  ) {
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('assets/draco/');
    this.loader.setDRACOLoader(this.dracoLoader);

    // Subscribe to calculation results
    this.calcService.calculationResults$.subscribe((results) => {
      if (results) {
        this.updateScene(results);
      }
    });
  }

  init(container: HTMLDivElement): void {
    // Set up the scene immediately
    this.setupScene(container);

    // Load the initial model and add it to the scene
    this.loadInitialModel();

    // Start loading configs and models in the background
    this.loadConfigs()
      .pipe(
        tap(([modelsConfig, sceneConfig]) => {
          this.modelsConfig = modelsConfig;
          this.sceneConfig = sceneConfig;
        }),
        switchMap(() => this.loadModels(this.modelsConfig))
      )
      .subscribe({
        next: () => {
          console.log('Configs and models loaded.');
          // Models are now loaded and can be used in updateScene
        },
        error: (error) => {
          console.error('Failed to load configs or models:', error);
        },
      });
  }

  private setupScene(container: HTMLDivElement): void {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee);

    // Set up the camera
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    this.camera.position.z = 5;

    // Set up the renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    container.appendChild(this.renderer.domElement);

    // _____ Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
    ambientLight.intensity = 4;
    this.scene.add(ambientLight);

    // _____ Directional light
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(1, 1, 1).normalize(); // top right, facing towards the origin
    directionalLight2.position.set(-1, 1, 1).normalize(); // top left, facing towards the origin
    this.scene.add(directionalLight);
    this.scene.add(directionalLight2);

    // _____ Spot light
    const spotLight = new THREE.SpotLight(0xFFFFFF, 20, undefined, undefined, undefined, 4);
    spotLight.position.set(6.1,3.3,-10.3);
    spotLight.castShadow = false;
    this.scene.add(spotLight);

    // Start animation loop outside Angular's zone
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  private loadInitialModel(): void {
    const initialModelPath = 'assets/models/TV_MODEL.glb';

    this.loader.load(
      initialModelPath,
      (gltf) => {
        const initialModel = gltf.scene;
        this.scene.add(initialModel);
      },
      undefined,
      (error) => {
        console.error('Error loading initial model:', error);
      }
    );
  }

  private loadConfigs(): Observable<[ModelsConfig, SceneConfig]> {
    const modelsConfig$ = this.http.get<ModelsConfig>('/assets/config/modelsconfig.json');
    const sceneConfig$ = this.http.get<SceneConfig>('/assets/config/sceneconfig.json');
    return forkJoin([modelsConfig$, sceneConfig$]);
  }

  private loadModels(modelsConfig: ModelsConfig): Observable<void> {
    const modelLoadObservables = [];

    for (const key in modelsConfig.models) {
      const modelData = modelsConfig.models[key];
      const modelFilePath = `/assets/models/${modelData.file}`;

      // Create an observable for each model load
      const modelLoad$ = new Observable<void>((observer) => {
        this.loader.load(
          modelFilePath,
          (gltf) => {
            const model = gltf.scene;
            model.name = modelData.name;

            // Store the loaded model
            this.loadedModels[modelData.name] = model;

            observer.next();
            observer.complete();
          },
          undefined,
          (error) => {
            console.error(`Error loading model ${modelData.name} from ${modelFilePath}`, error);
            observer.error(error);
          }
        );
      });

      modelLoadObservables.push(modelLoad$);
    }

    // Wait until all models are loaded
    return forkJoin(modelLoadObservables).pipe(map(() => {}));
  }

  updateScene(params: {
    constructionType: number;
    profileLength: number;
    loadType: number;
    profileType: string;
  }): void {
    console.log('updateScene(), parameters:', params);

    // Clear the entire scene
    this.clearScene();

    // Ensure models and scene configs are loaded
    if (
      !this.modelsConfig ||
      Object.keys(this.loadedModels).length === 0 ||
      !this.sceneConfig
    ) {
      console.warn('Models or sceneConfig not loaded yet.');
      return;
    }

    // Map profileType to match keys in sceneConfig
    const profileTypeKey = params.profileType.replace('/', '_'); // "28/30" => "28_30"
    const profileLengthKey = params.profileLength.toString(); // 400 => "400"

    // Retrieve the console config
    const consoleConfig = this.sceneConfig.consoles[profileTypeKey];
    if (!consoleConfig) {
      console.warn(`Console config for profile type ${profileTypeKey} not found.`);
      return;
    }

    // Retrieve the length config
    const lengthConfigEntry = consoleConfig[profileLengthKey];
    if (!lengthConfigEntry || typeof lengthConfigEntry === 'number') {
      console.warn(`Length config for profile length ${profileLengthKey} not found.`);
      return;
    }
    const lengthConfig = lengthConfigEntry as LengthConfig;

    // Update camera position
    this.camera.position.set(
      lengthConfig.cameraPosition.x,
      lengthConfig.cameraPosition.y,
      lengthConfig.cameraPosition.z
    );

    // Update camera target
    this.camera.lookAt(
      lengthConfig.OCTarget.x,
      lengthConfig.OCTarget.y,
      lengthConfig.OCTarget.z
    );

    // Determine which models to add based on parameters
    const modelsToAdd = this.getModelsToAdd(params);

    // Add models to the scene
    modelsToAdd.forEach((modelName) => {
      const model = this.loadedModels[modelName];
      if (model) {
        // Clone the model to avoid modifying the original
        const modelClone = model.clone();

        // Set position if defined in modelsConfig
        const position = this.modelsConfig.models[modelName].position;
        if (position) {
          modelClone.position.set(position.x, position.y, position.z);
        }

        this.scene.add(modelClone);

        console.log('model ' + modelClone.name + ' added:');
        console.log(modelClone);
      } else {
        console.warn(`Model ${modelName} not found in loaded models.`);
      }
    });
  }

  private getModelsToAdd(params: {
    constructionType: number;
    profileLength: number;
    loadType: number;
    profileType: string;
  }): string[] {
    // Map profileType to match keys in sceneConfig
    const profileTypeKey = params.profileType.replace('/', '_'); // "28/30" => "28_30"

    if (profileTypeKey === '27_18') {
      return ['wall', 'base', '27_18_A', '27_18_B'];
    } else if (profileTypeKey === '28_30') {
      return ['wall', 'base', '28_30_A', '28_30_B'];
    }
    // Add more conditions as needed
    return [];
  }

  private clearScene(): void {
    if (!this.scene) {
      console.warn('Scene not initialized yet.');
      return;
    }

    // Dispose of objects
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });

    // Remove all children from the scene
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  onResize(container: HTMLDivElement): void {
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera.aspect = width / height;
    this.renderer.setSize(width, height);
    this.camera.updateProjectionMatrix();
  }

  dispose(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.renderer.dispose();
  }
}
