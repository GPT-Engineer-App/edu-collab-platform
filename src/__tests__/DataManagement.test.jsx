import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataManagement from '../pages/DataManagement';

test('renders data management page', () => {
  render(<DataManagement />);
  expect(screen.getByText(/Data Management/i)).toBeInTheDocument();
});

test('edits a cell value', async () => {
  render(<DataManagement />);
  const cell = await screen.findByDisplayValue(/John Doe/i);
  fireEvent.change(cell, { target: { value: 'Jane Doe' } });
  fireEvent.blur(cell);
  expect(await screen.findByDisplayValue(/Jane Doe/i)).toBeInTheDocument();
});