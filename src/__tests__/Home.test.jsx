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
  expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  expect(screen.getByText(/Welcome to the Home Page/i)).toBeInTheDocument();
  expect(screen.getByText(/Go to Media Library/i)).toBeInTheDocument();
});