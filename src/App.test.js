import { render, screen } from '@testing-library/react';
import App from './App';

test('App loaded successfully', () => {
  render(<App />);
  const pageHeading = screen.getByText(/Friends List/i);
  expect(pageHeading).toBeInTheDocument();
});
