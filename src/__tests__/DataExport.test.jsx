import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataExport from '../components/DataExport';

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

test('renders data export component', () => {
  render(<DataExport data={mockData} />);
  expect(screen.getByText(/Select Format:/i)).toBeInTheDocument();
  expect(screen.getByText(/Export/i)).toBeInTheDocument();
});

test('exports data in CSV format', () => {
  render(<DataExport data={mockData} />);
  fireEvent.change(screen.getByLabelText(/Select Format:/i), { target: { value: 'csv' } });
  fireEvent.click(screen.getByText(/Export/i));
  // Add assertions to verify CSV export functionality
});

test('exports data in JSON format', () => {
  render(<DataExport data={mockData} />);
  fireEvent.change(screen.getByLabelText(/Select Format:/i), { target: { value: 'json' } });
  fireEvent.click(screen.getByText(/Export/i));
  // Add assertions to verify JSON export functionality
});