
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import mockRenderer from 'tiny-viewer/src/__mocks__/mockRenderer';
import App from '../App';
import '@testing-library/jest-dom';
import * as THREE from 'three';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('three/examples/jsm/loaders/RGBELoader', () => ({
  RGBELoader: jest.fn().mockImplementation(() => {
    return {load: jest.fn()}
  })
}));

jest.mock('tiny-viewer/src/environment/environment', () => ({
    ...jest.requireActual('tiny-viewer/src/environment/environment'),
    createRenderer: () => (mockRenderer),
    createControls: () => ({update: jest.fn()}),
  }),
);
const mockObject3D = new THREE.Object3D();
jest.mock('tiny-viewer/src/utils/loaders', () => ({
  loadGLB: () => {
    return Promise.resolve(mockObject3D)
  },
}));

const mockDiv = document.createElement('div');
jest.mock('tiny-viewer/src/hooks/useClientSize', () => () => ({
  clientSize: {clientHeight: 200, clientWidth: 200},
  mountingPoint: {current: mockDiv},
}));

test('Should render the App and wait until object-mounted marker will be visible', async() => {
  render(<App />);

  const loader = screen.getByText('Preparing scene...');
  await waitForElementToBeRemoved(loader);


});
