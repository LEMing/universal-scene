import * as THREE from 'three';
export function generateGrass(planeWidth: number, planeHeight: number, numGrass: number): THREE.Object3D {
  // Create an empty container object
  const grass = new THREE.Object3D();

  // Create a grass material
  const grassMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  // Generate the grass blades
  for (let i = 0; i < numGrass; i++) {
    // Create a grass blade geometry
    const grassGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);

    // Create a grass blade mesh
    const grassBlade = new THREE.Mesh(grassGeometry, grassMaterial);

    // Set the grass blade's position to a random point on the plane
    grassBlade.position.set(
      Math.random() * planeWidth - planeWidth / 2,
      0,
      Math.random() * planeHeight - planeHeight / 2
    );

    // Add the grass blade to the container object
    grass.add(grassBlade);
  }

  // Return the grass container object
  return grass;
}

export function generateRealisticGrass(
  planeWidth: number,
  planeHeight: number,
  grassTexture: THREE.Texture,
  grassDisplacementMap: THREE.Texture,
  grassAlphaMap: THREE.Texture
): THREE.Object3D {
  // Create an empty container object
  const grass = new THREE.Object3D();

  // Create a custom grass material using shaders
  const grassMaterial = new THREE.ShaderMaterial({
    uniforms: {
      grassMap: { value: grassTexture },
      grassDisplacementMap: { value: grassDisplacementMap },
      grassAlphaMap: { value: grassAlphaMap },
    },
    vertexShader: `
      varying vec2 vUv;
      uniform sampler2D grassDisplacementMap;

      void main() {
        vUv = uv;
        vec4 displacement = texture2D(grassDisplacementMap, vUv);
        vec3 newPosition = position + normal * displacement.r;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D grassMap;
      uniform sampler2D grassAlphaMap;
      varying vec2 vUv;

      void main() {
        vec4 grassColor = texture2D(grassMap, vUv);
        vec4 alpha = texture2D(grassAlphaMap, vUv);
        gl_FragColor = vec4(grassColor.rgb, alpha.r);
      }
    `,
    transparent: true,
  });

  // Create a ground plane geometry
  const planeGeometry = new THREE.PlaneBufferGeometry(planeWidth, planeHeight, 1, 1);

  // Create a ground plane mesh
  const plane = new THREE.Mesh(planeGeometry, grassMaterial);
  plane.rotation.x = -Math.PI / 2;

  // Add the ground plane to the container object
  grass.add(plane);

  // Return the grass container object
  return grass;
}


export function createGrass(width: number, height: number, numGrass: number): THREE.Group {
  const grassGeometry = new THREE.PlaneBufferGeometry(1, 1);
  const grassMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});

  const grassGroup = new THREE.Group();
  for (let i = 0; i < numGrass; i++) {
    const grass = new THREE.Mesh(grassGeometry, grassMaterial);
    grass.position.x = Math.random() * width - (width / 2);
    grass.position.y = Math.random() * height - (height / 2);
    grass.rotation.z = Math.random() * Math.PI;
    grass.scale.set(Math.random() + 0.5, Math.random() + 0.5, 1);
    grassGroup.add(grass);
  }

  return grassGroup;
}
