import {render, screen, waitFor} from '@testing-library/react';
import React from 'react';
import {createCube} from '../../utils';
import mockRenderer from '../__mocks__/mockRenderer';
import Viewer from '../Viewer';
import '@testing-library/jest-dom';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('../environment/environment', () => ({
    ...jest.requireActual('../environment/environment'),
    createRenderer: () => (mockRenderer),
    createControls: () => ({}),
  }),
);

jest.mock('../hooks/useClientSize', () => () => ({
  clientSize: {clientHeight: 2, clientWidth: 2},
  mountingPoint: jest.fn()
}));

describe('Viewer component', () => {
  test('Should find "Loading..." message', async () => {
    render(<Viewer />);

    await waitFor(() => {
      const loader = screen.getByText('Loading...');
      expect(loader).toBeInTheDocument();
    });
  });

  test('Should find the universal scene test id', async () => {
    const object3D = Promise.resolve(createCube({name: 'My cube'}));
    render(<Viewer object3D={object3D}/>);

    await waitFor(() => {
      const loader = screen.getByTestId('universal-scene');
      expect(loader).toBeInTheDocument();
    });
  });
})
