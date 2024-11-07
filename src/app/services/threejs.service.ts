import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, DRACOLoader } from 'three-stdlib'; // stdlib provides types definition for TS
import { ConstructionCalcService } from './construction-calc.service';

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
  private model: THREE.Group | null = null;

  constructor(
    private ngZone: NgZone,
    private calcService: ConstructionCalcService
  ) {
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('assets/draco/'); // The type definitions are now correct
    this.loader.setDRACOLoader(this.dracoLoader);

    this.calcService.calculationResults$.subscribe((results) => {
      if (results) {
        this.updateScene(results);
      }
    });

    //TODO: load all configs...
  }

  init(container: HTMLDivElement): void {
    // Set up the scene
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
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);   
    // Render the scene
    this.renderer.render(this.scene, this.camera);
  };

  updateScene(results: any): void {
    // Remove existing objects if necessary
    this.clearScene();

    // Load the new model
    this.loader.load(
      'assets/models/TV_MODEL.glb', // Update with the correct path to your model
      (gltf) => {
        this.model = gltf.scene;
        this.scene.add(this.model);
        // Apply transformations based on `results`
        this.applyTransformations(results);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model', error);
      }
    );
  }

  private applyTransformations(results: any): void {
    if (this.model) {
      // Example: Scale the model based on `results`
      const scale = results.maxLoad / 100;
      this.model.scale.set(scale, scale, scale);
      // Additional transformations can be applied here
    }
  }

  private clearScene(): void {
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
