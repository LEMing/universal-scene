import React from 'react';
import {render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import mockRenderer from '../components/TinyViewer/__mocks__/mockRenderer';
import App from '../App';
import '@testing-library/jest-dom';

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

jest.mock('../components/TinyViewer/environment/environment', () => ({
    ...jest.requireActual('../components/TinyViewer/environment/environment'),
    createRenderer: () => (mockRenderer),
    createControls: () => ({update: jest.fn()}),
  }),
);

const mockDiv = document.createElement('div');
jest.mock('../components/TinyViewer/hooks/useClientSize', () => () => ({
  clientSize: {clientHeight: 200, clientWidth: 200},
  mountingPoint: {current: mockDiv},
}));

test('Should render the App and wait until object-mounted marker will be visible', async() => {
  render(<App />);

  const loader = screen.getByText('Loading...');
  await waitForElementToBeRemoved(loader);

  await waitFor(async() => {
    const threeRoot = screen.getByTestId('three-root');
    await expect(threeRoot).toBeInTheDocument();
  });

  await waitFor(async() => {
    const universalScene = screen.getByTestId('universal-scene');
    await expect(universalScene).toBeInTheDocument();
    await expect(loader).not.toBeVisible();
  });

});
