import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../../theme';
import { LightPills } from '../LightPills';

describe('Light Pills Component', () => {
  it('Renders', () => {
    const { getByText } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <LightPills variant="success" label="Success" />
      </KuberaThemeProvider>
    );

    expect(getByText('Success')).toBeTruthy();
  });
});
