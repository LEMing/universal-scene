import {createGrass, generateRealisticGrass} from '../utils';
import * as THREE from 'three';
describe('createGrass', () => {
  it('should create a group of grass meshes with the specified number of grass', () => {
    const width = 10;
    const height = 10;
    const numGrass = 5;
    const grassGroup = createGrass(width, height, numGrass);

    expect(grassGroup).toBeInstanceOf(THREE.Group);
    expect(grassGroup.children.length).toBe(numGrass);
    expect(grassGroup.children[0]).toBeInstanceOf(THREE.Mesh);
  });

  it('should set the position, rotation, and scale of each grass mesh randomly within the specified width and height', () => {
    const width = 10;
    const height = 10;
    const numGrass = 5;
    const grassGroup = createGrass(width, height, numGrass);

    grassGroup.children.forEach((grass) => {
      expect(grass.position.x).toBeGreaterThanOrEqual(-width / 2);
      expect(grass.position.x).toBeLessThanOrEqual(width / 2);
      expect(grass.position.y).toBeGreaterThanOrEqual(-height / 2);
      expect(grass.position.y).toBeLessThanOrEqual(height / 2);
      expect(grass.rotation.z).toBeGreaterThanOrEqual(0);
      expect(grass.rotation.z).toBeLessThanOrEqual(Math.PI);
      expect(grass.scale.x).toBeGreaterThanOrEqual(0.5);
      expect(grass.scale.y).toBeGreaterThanOrEqual(0.5);
      expect(grass.scale.z).toBe(1);
    });
  });
});

describe('generateRealisticGrass', () => {
  it('should create a container object with a ground plane mesh using the specified textures and shaders', () => {
    const planeWidth = 10;
    const planeHeight = 10;
    const grassTexture = new THREE.Texture();
    const grassDisplacementMap = new THREE.Texture();
    const grassAlphaMap = new THREE.Texture();
    const grass = generateRealisticGrass(planeWidth, planeHeight, grassTexture, grassDisplacementMap, grassAlphaMap);

    expect(grass).toBeInstanceOf(THREE.Object3D);
    expect(grass.children[0]).toBeInstanceOf(THREE.Mesh);
    expect(grass.children[0].geometry).toBeInstanceOf(THREE.PlaneBufferGeometry);
    expect(grass.children[0].material).toBeInstanceOf(THREE.ShaderMaterial);
    expect(grass.children[0].material.uniforms.grassMap.value).toBe(grassTexture);
    expect(grass.children[0].material.uniforms.grassDisplacementMap.value).toBe(grassDisplacementMap);
    expect(grass.children[0].material.uniforms.grassAlphaMap.value).toBe(grassAlphaMap);
    expect(grass.children[0].rotation.x).toBe(-Math.PI / 2);
  });
});
