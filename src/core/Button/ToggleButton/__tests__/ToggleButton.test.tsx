import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../../theme';
import { ToggleButton } from '../ToggleButton';

describe('Toggle Button Component', () => {
  it('Renders', () => {
    const { getByText } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <ToggleButton onClick={() => {}}>Toggle Button</ToggleButton>
      </KuberaThemeProvider>
    );

    expect(getByText('Toggle Button')).toBeTruthy();
  });
});
