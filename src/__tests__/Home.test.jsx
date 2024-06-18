import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home';

test('renders home page', () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  expect(screen.getByText(/Homepage/i)).toBeInTheDocument();
  expect(screen.getByText(/Welcome to our homepage/i)).toBeInTheDocument();
  expect(screen.getByText(/Explore the Media Library/i)).toBeInTheDocument();
});