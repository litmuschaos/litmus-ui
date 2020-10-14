import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../../theme';
import { ButtonOutlined } from '../../ButtonOutlined';

describe('Button Outlined Component', () => {
  it('Renders', () => {
    const { getByText } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <ButtonOutlined onClick={() => {}}>Button Outlined</ButtonOutlined>
      </KuberaThemeProvider>
    );

    expect(getByText('Button Outlined')).toBeTruthy();
  });
});
