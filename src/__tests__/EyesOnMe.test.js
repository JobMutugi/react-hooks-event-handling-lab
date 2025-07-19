import '@testing-library/jest-dom';  // Add this import at the top
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EyesOnMe from '../components/EyesOnMe';

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
});

test('displays a button with the text "Eyes on me"', () => {
  const { getByText } = render(<EyesOnMe />);
  const button = getByText(/Eyes on me/i);
  expect(button).toBeInTheDocument();
  expect(button.tagName).toBe('BUTTON');
});

test('focusing the button triggers console output', () => {
  const { getByText } = render(<EyesOnMe />);
  const button = getByText(/Eyes on me/i);
  
  fireEvent.focus(button);
  expect(console.log).toHaveBeenCalledWith('Good!');
});

test('removing focus (blur) on the button triggers console output', () => {
  const { getByText } = render(<EyesOnMe />);
  const button = getByText(/Eyes on me/i);
  
  fireEvent.blur(button);
  expect(console.log).toHaveBeenCalledWith('Hey! Eyes on me!');
});