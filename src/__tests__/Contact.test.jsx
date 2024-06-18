import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../pages/Contact';

test('renders contact page', () => {
  render(<Contact />);
  expect(screen.getByText(/Contact Page/i)).toBeInTheDocument();
  expect(screen.getByText(/Get in touch with us on this page/i)).toBeInTheDocument();
});