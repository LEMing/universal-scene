import { renderHook } from '@testing-library/react'
import useClientSize from '../useClientSize';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

test('Should create a default client dimensions', () => {
  const mockRefObject = {
    current: {offsetWidth: undefined, offsetHeight: undefined},
  }
  // @ts-ignore
  const {result} = renderHook(() => useClientSize(mockRefObject));
  // Expect to get default 10x10 size
  expect(result.current).toEqual({clientHeight: 10, clientWidth: 10});
})
