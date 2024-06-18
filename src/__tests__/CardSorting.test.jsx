import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardSorting from '../pages/CardSorting';

test('renders card sorting page', () => {
  render(<CardSorting />);
  expect(screen.getByText(/Card Sorting Exercise/i)).toBeInTheDocument();
});

test('adds a new category', () => {
  render(<CardSorting />);
  fireEvent.change(screen.getByPlaceholderText(/Add a new category/i), { target: { value: 'New Category' } });
  fireEvent.click(screen.getByText(/Add Category/i));
  expect(screen.getByText(/New Category/i)).toBeInTheDocument();
});

test('drags and drops a card into a category', () => {
  render(<CardSorting />);
  fireEvent.change(screen.getByPlaceholderText(/Add a new category/i), { target: { value: 'New Category' } });
  fireEvent.click(screen.getByText(/Add Category/i));
  const card = screen.getByText(/Card 1/i);
  const category = screen.getByText(/New Category/i);
  fireEvent.dragStart(card);
  fireEvent.drop(category);
  expect(screen.queryByText(/Card 1/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Card 1/i)).toBeInTheDocument();
});