import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../../theme';
import { ButtonOutlinedDefault } from '../../ButtonOutlined';

describe('Button Outlined Component', () => {
  it('Renders', () => {
    const { container } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <ButtonOutlinedDefault handleClick={() => {}} />
      </KuberaThemeProvider>
    );

    const node = container.querySelector('global.buttonOutlined');
    expect(node!.className).toEqual('buttonOutlined');
  });
});
