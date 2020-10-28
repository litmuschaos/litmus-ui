import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../theme';
import { Link } from '../Link';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Link component', () => {
  it('Renders', () => {
    const { getByRole } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <Router>
          <Link disabled={false} to="/home">
            Link
          </Link>
        </Router>
      </KuberaThemeProvider>
    );
    const element = getByRole('navlink');
    // check href
    expect(element).toHaveProperty('href', window.location.origin + '/home');
  });
});
