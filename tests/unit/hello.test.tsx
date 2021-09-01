import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hello } from '../../src/hello';

test('renders Hello component', async () => {
  render(<Hello name={'Peter'} />);

  const helloMessage = screen.getByText(/Hello Peter/i);
  expect(helloMessage).toBeInTheDocument();
});
