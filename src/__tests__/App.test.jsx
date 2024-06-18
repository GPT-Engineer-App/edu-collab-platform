import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

test('renders header and footer', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  expect(screen.getByText(/Welcome to MyApp/i)).toBeInTheDocument();
  expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
});

test('renders media library link', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  expect(screen.getByText(/Explore Media/i)).toBeInTheDocument();
});