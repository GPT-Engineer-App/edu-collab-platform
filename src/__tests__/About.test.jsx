import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

test('renders about page', () => {
  render(<About />);
  expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  expect(screen.getByText(/Discover more about our mission and values/i)).toBeInTheDocument();
});