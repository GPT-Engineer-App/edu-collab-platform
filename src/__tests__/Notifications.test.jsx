import React from 'react';
import { render, screen } from '@testing-library/react';
import Notifications from '../pages/Notifications';

test('renders notifications page', () => {
  render(<Notifications />);
  expect(screen.getByText(/You have no new notifications/i)).toBeInTheDocument();
});