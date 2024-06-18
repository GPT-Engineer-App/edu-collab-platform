import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContentEditor from '../pages/ContentEditor';

test('renders content editor and handles tags', () => {
  render(<ContentEditor />);

  // Check if the content editor is rendered
  expect(screen.getByText(/Content Editor/i)).toBeInTheDocument();

  // Add a tag
  fireEvent.change(screen.getByPlaceholderText(/Add a tag/i), { target: { value: 'test-tag' } });
  fireEvent.click(screen.getByText(/Add Tag/i));
  expect(screen.getByText(/test-tag/i)).toBeInTheDocument();

  // Remove the tag
  fireEvent.click(screen.getByText(/×/i));
  expect(screen.queryByText(/test-tag/i)).not.toBeInTheDocument();
});