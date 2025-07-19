import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Keypad from '../components/Keypad';

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
});

test('displays one input', () => {
  const { getByLabelText } = render(<Keypad />);
  const input = getByLabelText('Password:'); // You'll need to add aria-label to your input
  expect(input).toBeInTheDocument();
  expect(input.tagName).toBe('INPUT');
});

test('displays an input with the right input type', () => {
  const { getByLabelText } = render(<Keypad />);
  const input = getByLabelText('Password:');
  expect(input).toHaveAttribute('type', 'password');
});

test('typing in the input triggers console output', () => {
  const { getByLabelText } = render(<Keypad />);
  const input = getByLabelText('Password:');
  
  fireEvent.change(input, { target: { value: '123' } });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls[0][0]).toBe('Entering password...');
});