import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../../theme';
import { Pills } from '../BasicPills';

describe('Basic Pills Component', () => {
  it('Renders', () => {
    const { getByText } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <Pills variant="default" label="Basic Pill" />
      </KuberaThemeProvider>
    );

    expect(getByText('Basic Pill')).toBeTruthy();
  });
});
