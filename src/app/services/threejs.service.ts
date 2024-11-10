import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as THREE from 'three';
import { GLTFLoader, DRACOLoader } from 'three-stdlib';
import { ConstructionCalcService } from './construction-calc.service';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

// Define interfaces
interface ModelConfig {
  file: string;
  name: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
}

interface ModelsConfig {
  models: { [key: string]: ModelConfig };
}

interface SceneConfig {
  // Define properties of your sceneConfig here if needed
}

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
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Set up the renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    container.appendChild(this.renderer.domElement);

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
        initialModel.name = 'InitialModel'; // Set a name to identify it
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

    // Remove existing objects except the initial model
    this.clearScene();

    // Ensure models are loaded
    if (!this.modelsConfig || Object.keys(this.loadedModels).length === 0) {
      console.warn('Models not loaded yet.');
      return;
    }

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
    // Logic to determine which models to add based on parameters
    if (params.profileType === '27/18') {
      return ['wall', 'base', '27_18_A', '27_18_B'];
    } else if (params.profileType === '28/30') {
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

  private disposeObject(object: THREE.Object3D): void {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
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
