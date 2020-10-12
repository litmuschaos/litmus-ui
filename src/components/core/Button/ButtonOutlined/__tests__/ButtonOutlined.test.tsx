import { render } from '@testing-library/react';
import React from 'react';
import { ButtonOutlinedDefault } from '../../ButtonOutlined';

describe('Button Outlined Component', () => {
  it('Renders', () => {
    const { container } = render(
      <ButtonOutlinedDefault handleClick={() => {}} />
    );

    const node = container.querySelector('global.buttonOutlined');
    expect(node!.className).toEqual('buttonOutlined');
  });
});
