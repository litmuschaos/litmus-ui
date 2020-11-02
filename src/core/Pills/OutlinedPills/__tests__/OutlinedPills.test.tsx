import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../../theme';
import { OutlinedPills } from '../../../Pills';

describe('Basic Pills Component', () => {
  it('Renders', () => {
    const { getByText } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <OutlinedPills label="Outlined Pill" />
      </KuberaThemeProvider>
    );

    expect(getByText('Outlined Pill')).toBeTruthy();
  });
});
