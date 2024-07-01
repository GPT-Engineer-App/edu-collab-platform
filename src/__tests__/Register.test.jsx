import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Register from '../pages/Register';

const mockStore = configureStore([]);
const store = mockStore({});

test('renders register page and handles registration', () => {
  render(
    <Provider store={store}>
      <Router>
        <Register />
      </Router>
    </Provider>
  );

  expect(screen.getByText(/Register/i)).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/Register/i));
});