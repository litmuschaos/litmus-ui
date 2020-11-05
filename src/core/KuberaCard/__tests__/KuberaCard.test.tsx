import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../theme';
import { KuberaCard } from '../KuberaCard';

describe('Button Filled Component', () => {
  it('Renders', () => {
    const { getByText } = render(
      <KuberaThemeProvider platform="kubera-propel">
        <KuberaCard width="15rem" height="20rem" borderColor="#5B44BA" glow>
          Card With Glow
        </KuberaCard>
      </KuberaThemeProvider>
    );

    expect(getByText('Card With Glow')).toBeTruthy();
  });
});
