import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataManagement from '../pages/DataManagement';
import { get, put } from '../services/api';

jest.mock('../services/api');

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

describe('DataManagement', () => {
  beforeEach(() => {
    get.mockResolvedValue(mockData);
  });

  test('renders data management page', async () => {
    render(<DataManagement />);
    expect(await screen.findByText(/Data Management/i)).toBeInTheDocument();
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    expect(await screen.findByText(/Jane Smith/i)).toBeInTheDocument();
  });

  test('edits data inline', async () => {
    render(<DataManagement />);
    const nameInput = await screen.findByDisplayValue(/John Doe/i);
    fireEvent.change(nameInput, { target: { value: 'John Updated' } });
    fireEvent.blur(nameInput);
    expect(put).toHaveBeenCalledWith('/user-data/1', { id: 1, name: 'John Updated', email: 'john@example.com', role: 'Admin' });
  });
});