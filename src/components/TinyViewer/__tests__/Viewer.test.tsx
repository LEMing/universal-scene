import {render, screen, waitFor} from '@testing-library/react';
import React from 'react';
import {createCube} from '../../utils';
import Viewer from '../Viewer';
import '@testing-library/jest-dom';

describe('Viewer component', () => {
  test('Should find "Loading..." message', async () => {
    render(<Viewer />);

    await waitFor(() => {
      const loader = screen.getByText('Preparing scene...');
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
