import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {ControlsProps, SceneProps, LightProps} from './types';

const DEFAULT_ENVIRONMENT = {
  clientHeight: 480,
  clientWidth: 640,
  fogColor: 0xFFFFFF,
  lightIntensity: 1,
  sceneColor: 0xFAFDFE,
  skyColor: 0xF7FBFB,
  groundColor: 0x9EA4A7,
};

export const createCamera = () => {
  console.log(': createCamera');
  const myCamera = new THREE.PerspectiveCamera(30, undefined, 1, 5000);
  myCamera.position.set(0, 2, 20);
  return myCamera;
};

export const createScene = (props: SceneProps = {}) => {
  console.log(': createScene');
  const {
    color = DEFAULT_ENVIRONMENT.sceneColor,
    fog = DEFAULT_ENVIRONMENT.fogColor,
  } = props;
  const myScene = new THREE.Scene();
  myScene.background = new THREE.Color().setHex(color);
  myScene.fog = new THREE.Fog(fog, 1, 5000);
  return myScene;
};

export const createRenderer = () => {
  console.log(': createRenderer');
  const myRenderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true});
  myRenderer.autoClear = true;
  myRenderer.setPixelRatio(window.devicePixelRatio);
  myRenderer.shadowMap.enabled = true;
  myRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return myRenderer;
};

export const createControls = (props: ControlsProps) => {
  const {camera, renderer} = props;
  const myControls = new OrbitControls(camera, renderer.domElement);
  myControls.autoRotateSpeed = 6;
  myControls.enableDamping = false;
  myControls.enablePan = false;
  myControls.enableZoom = true;
  myControls.maxDistance = 300;
  myControls.minDistance = 10;
  myControls.screenSpacePanning = false;
  myControls.target = new THREE.Vector3(0, 1.5, 0);
  myControls.mouseButtons = {
    LEFT: THREE.MOUSE.LEFT,
    MIDDLE: THREE.MOUSE.MIDDLE,
    RIGHT: THREE.MOUSE.RIGHT,
  };
  return myControls;
};

export const createLight = (props: LightProps = {}): THREE.Object3D[] => {
  const {
    intensity = DEFAULT_ENVIRONMENT.lightIntensity,
    skyColor = DEFAULT_ENVIRONMENT.skyColor,
    groundColor = DEFAULT_ENVIRONMENT.groundColor,
  } = props;
  const atmosphereLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);

  const directionalLight = new THREE.DirectionalLight(0xffffff, intensity / 2);
  directionalLight.position.y = 50;
  directionalLight.position.x = 100;
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024 * 4;
  directionalLight.shadow.mapSize.height = 1024 * 4;
  directionalLight.shadow.radius = 1;
  directionalLight.shadow.bias = 0.00001;

  return [atmosphereLight, directionalLight];
};
