import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../../theme';
import { Paragraph } from '../../Paragraph';

describe('Text Component', () => {
  it('Renders', () => {
    const { getByText } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <Paragraph>Paragraph Text</Paragraph>
      </KuberaThemeProvider>
    );

    expect(getByText('Paragraph Text')).toBeTruthy();
  });
});
