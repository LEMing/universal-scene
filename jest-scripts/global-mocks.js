import mockRenderer from '../src/components/TinyViewer/__mocks__/mockRenderer';

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

jest.mock('../src/components/TinyViewer/environment/environment', () => ({
    ...jest.requireActual('../src/components/TinyViewer/environment/environment'),
    createRenderer: jest.fn().mockImplementation(() => mockRenderer),
  }),
);

jest.mock('../src/components/TinyViewer/hooks/useClientSize', () => () => ({
  clientSize: {clientHeight: 2, clientWidth: 2},
  mountingPoint: jest.fn()
}));
