import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../../theme';
import { Subtitle } from '../Subtitle';

describe('Text Component', () => {
  it('Renders', () => {
    const { getByText } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <Subtitle>Subtitle Text</Subtitle>
      </KuberaThemeProvider>
    );

    expect(getByText('Subtitle Text')).toBeTruthy();
  });
});
