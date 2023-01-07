import * as THREE from 'three';
import DrawableObject from '../DrawableObject';
class Water extends DrawableObject {

  public readonly position: THREE.Vector3;
  public reached: boolean = false;
  constructor({position}: {position: THREE.Vector3}) {
    super();
    this.position = position;
    // Set up the Cannon.js physics world
  }
  get color() {
    if (this.reached) {
      return 0x00000;
    }
    return 0x00FF00;
  }

  draw() {
    // Create a particle system to represent the liquid
    const particlePositions = new Float32Array(1000 * 3);
    const particleColors = new Float32Array(1000 * 3);
    const particleSizes = new Float32Array(1000);
    for (let i = 0; i < 1000; i++) {
      // Create a random position and color for each particle
      particlePositions[i * 3] = Math.random() * 10 - 5;
      particlePositions[i * 3 + 1] = Math.random() * 10 - 5;
      particlePositions[i * 3 + 2] = Math.random() * 10 - 5;
      particleColors[i * 3] = Math.random();
      particleColors[i * 3 + 1] = Math.random();
      particleColors[i * 3 + 2] = Math.random();
      particleSizes[i] = 0.2;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    const particleMaterial = new THREE.PointsMaterial({
      vertexColors: true,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);

    // Create a custom shader to give the particles the appearance of a liquid
    const liquidShader = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x006699) },
        pointSize: { value: 1 },
      },
      vertexShader: `
      uniform float pointSize;
      void main() {
        gl_PointSize = pointSize;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform vec3 color;
      void main() {
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    });

    // Set the particle system's material to the custom shader
    particleSystem.material = liquidShader;

    this.group.add(particleSystem);
    return this.group;
  }
}

export default Water;
