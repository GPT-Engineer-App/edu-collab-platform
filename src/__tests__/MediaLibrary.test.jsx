import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MediaLibrary from '../components/MediaLibrary';

test('renders media library and handles file upload', () => {
  render(<MediaLibrary />);

  // Check if the media library is rendered
  expect(screen.getByText(/Upload/i)).toBeInTheDocument();

  // Simulate file upload
  const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
  const input = screen.getByLabelText(/file/i);
  fireEvent.change(input, { target: { files: [file] } });

  // Check if the file is selected
  expect(input.files[0]).toBe(file);
  expect(input.files.item(0)).toBe(file);
  expect(input.files).toHaveLength(1);
});