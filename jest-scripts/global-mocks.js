import mockRenderer from 'tiny-viewer/src/__mocks__/mockRenderer';

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

jest.mock('tiny-viewer/src/environment/environment', () => ({
    ...jest.requireActual('tiny-viewer/src/environment/environment'),
    createRenderer: jest.fn().mockImplementation(() => mockRenderer),
  }),
);

jest.mock('tiny-viewer/src/hooks/useClientSize', () => () => ({
  clientSize: {clientHeight: 2, clientWidth: 2},
  mountingPoint: jest.fn()
}));
