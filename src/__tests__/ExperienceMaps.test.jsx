import React from 'react';
import { render, screen } from '@testing-library/react';
import ExperienceMaps from '../pages/ExperienceMaps';

test('renders experience maps page', () => {
  render(<ExperienceMaps />);
  expect(screen.getByText(/Experience Maps/i)).toBeInTheDocument();
  expect(screen.getByText(/Student Journey/i)).toBeInTheDocument();
  expect(screen.getByText(/Teacher Journey/i)).toBeInTheDocument();
});