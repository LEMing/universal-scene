
import {IViewerContext} from '../ViewerContext';

const mockViewerContext: IViewerContext = {
  threeRoot: null,
  setIsLoading: jest.fn,
  clientSize: {
    clientHeight: 1,
    clientWidth: 1,
  },
}

export default mockViewerContext;
