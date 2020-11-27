import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders some loading tag', () => {
  const { getByTestId } = render(
    <Router>
      <App />
    </Router>
  );
  const loadingEl = getByTestId('Loading');
  expect(loadingEl).toBeInTheDocument();
  expect(loadingEl).toHaveAttribute('aria-busy');
});
