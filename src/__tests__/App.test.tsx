import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('../components/TinyViewer/environment/environment', () => ({
    ...jest.requireActual('../components/TinyViewer/environment/environment'),
    createRenderer: () => ({setSize: jest.fn(), render: jest.fn()}),
    createControls: () => ({}),
  }),
);

jest.mock('../components/TinyViewer/hooks/useInitMethod', () => () => jest.fn());

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('My text');
  expect(linkElement).toBeInTheDocument();
});
