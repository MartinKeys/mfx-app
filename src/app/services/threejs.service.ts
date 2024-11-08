import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as THREE from 'three';
import { GLTFLoader, DRACOLoader } from 'three-stdlib'; // stdlib provides types definition for TS
import { ConstructionCalcService } from './construction-calc.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreejsService {

  // Declare variables
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private animationFrameId: number;
  private loader: GLTFLoader;
  private dracoLoader: DRACOLoader;
  private model: THREE.Group | null = null;
  private modelsConfig: any;
  private sceneConfig: any;

  constructor(
    private ngZone: NgZone,
    private calcService: ConstructionCalcService,
    private http: HttpClient
  ) {
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('assets/draco/'); // The type definitions are now correct
    this.loader.setDRACOLoader(this.dracoLoader);

    // subscribe to calculation for updating the scene
    this.calcService.calculationResults$.subscribe((results) => {
      if (results) {
        this.updateScene(results);
      }
    });
  }

  init(container: HTMLDivElement): void {
    this.loadConfigs().subscribe(
      ([modelsConfig, sceneConfig]) => {
        this.modelsConfig = modelsConfig;
        this.sceneConfig = sceneConfig;        
        // Initialize the scene
        this.setupScene(container);
      },
      (error) => {
        console.error('Failed to load configs:', error);
      }
    );
  }

  private setupScene(container: HTMLDivElement): void {
    // Initialize scene setup here using `this.modelsConfig` and `this.sceneConfig`
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
    // Add a simple cube to the scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    // Start animation loop outside Angular's zone
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });

    console.log(this.sceneConfig);
    console.log(this.modelsConfig);
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);   
    this.renderer.render(this.scene, this.camera);
  };

  // Method to load JSON configs
  loadConfigs(): Observable<any[]> {
    const modelsConfig$ = this.http.get('/assets/config/modelsconfig.json');
    const sceneConfig$ = this.http.get('/assets/config/sceneconfig.json');
    return forkJoin([modelsConfig$, sceneConfig$]);
  }

  updateScene(params: {
    constructionType: number;
    profileLength: number;
    loadType: number;
    profileType: string;
    }): void {

    console.log('updateScene(), parameters:');
    console.log(params);

    // Remove existing objects if necessary
    this.clearScene();
  
    // Load the model based on parameters (adjust the model path as needed)
    const modelPath = 'assets/models/TV_MODEL.glb';
  
    this.loader.load(
      modelPath,
      (gltf) => {
        this.model = gltf.scene;
        this.scene.add(this.model);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model', error);
      }
    );
  }


  private clearScene(): void {
    if (!this.scene) {
      console.warn('Scene not initialized yet.');
      return;
    } 
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        // Dispose of geometry
        if (object.geometry) {
          object.geometry.dispose();
        }
        // Dispose of material
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      }
    });
    // Remove all children from the scene
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }  
    // Reset the model reference
    this.model = null;
  }

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
