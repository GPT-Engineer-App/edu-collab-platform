import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../pages/Login';

const mockStore = configureStore([]);
const store = mockStore({});

test('renders login page and handles login', () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/Login/i));
});