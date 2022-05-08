import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import mockRenderer from '../../__mocks__/mockRenderer';
import mockViewerContext from '../../__mocks__/mockViewerContext';
import UniversalScene from '../UniversalScene';
import ViewerContext from '../../ViewerContext';

jest.mock('three/examples/jsm/loaders/RGBELoader', () => ({
  RGBELoader: jest.fn().mockImplementation(() => {
    return {load: jest.fn()}
  })
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('../../environment/environment', () => ({
    ...jest.requireActual('../../environment/environment'),
    createRenderer: () => (mockRenderer),
  }),
);

jest.mock('../hooks/useInitMethod', () => () => jest.fn());

test('Should render UniversalScene', async() => {
  render(
    <ViewerContext.Provider value={mockViewerContext}>
      <UniversalScene/>
    </ViewerContext.Provider>
  );

  await waitFor(() => {
    const universalScene = screen.getByTestId('universal-scene');
    expect(universalScene).toBeInTheDocument();
  });
});
