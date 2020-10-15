import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../../theme';
import { ButtonFilled } from '../ButtonFilled';

describe('Button Filled Component', () => {
  it('Renders', () => {
    const { getByText } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <ButtonFilled onClick={() => {}}>Button Filled</ButtonFilled>
      </KuberaThemeProvider>
    );

    expect(getByText('Button Filled')).toBeTruthy();
  });
});
