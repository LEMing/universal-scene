import { renderHook } from '@testing-library/react'
import useClientSize from '../useClientSize';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

test('Should create a default client dimensions', () => {
  const {result} = renderHook(() => useClientSize());
  // Expect to get default 1x1 size
  const {clientSize, mountingPoint} = result.current;
  expect(mountingPoint).toBeDefined();
  expect(clientSize).toEqual({clientHeight: 1, clientWidth: 1});
})
