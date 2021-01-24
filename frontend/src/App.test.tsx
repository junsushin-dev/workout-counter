import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app bar tabs', () => {
  render(<App />);
  const dailyTabElement = screen.getByText(/DAILY/i);
  expect(dailyTabElement).toBeInTheDocument();
  const monthlyTabElement = screen.getByText(/MONTHLY/i);
  expect(monthlyTabElement).toBeInTheDocument();
  const routinesTabElement = screen.getByText(/ROUTINES/i);
  expect(routinesTabElement).toBeInTheDocument();
  const SettingsTabElement = screen.getByText(/SETTINGS/i);
  expect(SettingsTabElement).toBeInTheDocument();
});
