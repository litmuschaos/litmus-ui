import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../../theme';
import { Header } from '../Header';

describe('Text Component', () => {
  it('Renders', () => {
    const { getByText } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <Header>Header Text</Header>
      </KuberaThemeProvider>
    );

    expect(getByText('Header Text')).toBeTruthy();
  });
});
