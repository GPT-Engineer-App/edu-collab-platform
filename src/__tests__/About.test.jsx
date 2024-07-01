import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

test('renders about page', () => {
  render(<About />);
  expect(screen.getByText(/About Page/i)).toBeInTheDocument();
  expect(screen.getByText(/Learn more about us on this page/i)).toBeInTheDocument();
});