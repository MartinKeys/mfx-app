import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ThreejsService {

  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private animationFrameId: number;

  constructor(private ngZone: NgZone) {}

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

    // Start animation loop
    this.animate();
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Rotate the cube (assuming it's the first child)
    const cube = this.scene.children[0];
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  };

  onResize(container: HTMLDivElement): void {
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  dispose(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.renderer.dispose();
  }
}
