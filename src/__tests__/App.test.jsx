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
  expect(screen.getByText(/Header/i)).toBeInTheDocument();
  expect(screen.getByText(/Footer/i)).toBeInTheDocument();
});