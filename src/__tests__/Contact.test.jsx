import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../pages/Contact';

test('renders contact page', () => {
  render(<Contact />);
  expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  expect(screen.getByText(/We would love to hear from you!/i)).toBeInTheDocument();
});