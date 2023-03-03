/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call Regsiter function when Regsiter button is clicked
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

import '@testing-library/jest-dom';

describe('RegisterInput component', () => {
  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    // Action
    await userEvent.type(nameInput, 'nametest');

    // Assert
    expect(nameInput).toHaveValue('nametest');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'emailtest');

    // Assert
    expect(emailInput).toHaveValue('emailtest');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockRegsiter = jest.fn();
    render(<RegisterInput onRegister={mockRegsiter} />);

    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'nametest');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailtest');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button');

    // Action
    await fireEvent.submit(loginButton);

    // Assert
    expect(mockRegsiter).toBeCalledWith({
      name: 'nametest',
      email: 'emailtest',
      password: 'passwordtest',
    });
  });
});
