jest.mock('../components/TinyViewer/hooks/UseObject3DResolver', () => () => true);
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';
import mockRenderer from '../components/TinyViewer/__mocks__/mockRenderer';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
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

test('Should render the App and find preloader', async() => {
  render(<App />);

  await waitFor(() => {
    const linkElement = screen.getByText('Tiny Viewer');
    expect(linkElement).toBeInTheDocument();
  });

  await waitFor(() => {
    const loader = screen.getByText('Loading...');
    expect(loader).toBeInTheDocument();
  });

});
