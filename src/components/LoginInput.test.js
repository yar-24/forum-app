/* eslint-disable react/react-in-jsx-scope */
/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

import '@testing-library/jest-dom';

describe('LoginInput component', () => {
  it('should handle username typing correctly', async () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(usernameInput, 'emailtest');

    // Assert
    expect(usernameInput).toHaveValue('emailtest');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should handle button typing correctly', async () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = jest.fn();
    const user = userEvent;
    render(<LoginInput onLogin={mockLogin} />);
    const usernameInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(usernameInput, 'emailtest');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByText(/login/i);

    // Action
    await user.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'emailtest',
      password: 'passwordtest',
    });
  });
});
