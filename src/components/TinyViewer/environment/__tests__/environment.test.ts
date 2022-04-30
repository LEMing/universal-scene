import {Color} from 'three';
import {createCamera, createControls, createLight, createRenderer, createScene} from '../environment';

describe('Should test environment functions', () => {
  test('Create a Camera object', () => {
    const camera = createCamera();
    expect(camera.type).toEqual('PerspectiveCamera');
  });

  test('Create a Scene object', () => {
    const scene = createScene();
    expect(scene.type).toEqual('Scene');
  });

  test('Create a Scene with fog', () => {
    const fogColor = 0xFF000;
    const scene = createScene({fog: fogColor});
    const sceneFog = scene.fog?.color.getHex();
    expect(sceneFog).toEqual(fogColor);
  });

  test('Create a Scene with background color', () => {
    const backgroundColor = 0x00FF00;
    const scene = createScene({background: backgroundColor});
    const sceneBackground: Color = scene.background as Color;
    expect(sceneBackground.getHex()).toEqual(backgroundColor);
  });

  test('Create Renderer object', () => {
    expect(() => createRenderer()).toThrow('WebGL context is not available here');
  });

  test('Create Light', () => {
    const light = createLight();
    expect(light.length).toEqual(2);
    const [atmosphereLight, directionalLight] = light;
    expect(atmosphereLight.type).toEqual('HemisphereLight');
    expect(directionalLight.type).toEqual('DirectionalLight');
  });

  test('Create Controls', () => {
    const camera = createCamera();
    const mockRenderer = {domElement: {
      style: {},
      addEventListener: jest.fn(),
    }};
    // @ts-ignore
    const controls = createControls({camera, renderer: mockRenderer});
    expect(controls).toBeDefined();
    expect(controls.mouseButtons).toBeDefined();
  })
});