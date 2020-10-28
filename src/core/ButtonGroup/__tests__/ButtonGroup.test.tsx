import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../theme';
import { ButtonGroup } from '../ButtonGroup';

describe('ButtonGroup Component', () => {
  it('Renders', () => {
    const { getByTestId } = render(
      <KuberaThemeProvider platform="litmus-portal" data-testid="switch">
        <ButtonGroup variant="default" />
      </KuberaThemeProvider>
    );

    expect(getByTestId('switch')).toBeTruthy();
  });
});
