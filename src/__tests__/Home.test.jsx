import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('renders home page', () => {
  render(<Home />);
  expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  expect(screen.getByText(/Welcome to the Home Page/i)).toBeInTheDocument();
});