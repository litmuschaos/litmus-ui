import { render, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../theme';
import { InputField } from '../InputField';
import { screen } from '@testing-library/dom';

afterEach(cleanup);
jest.useFakeTimers();

describe('InputField component', () => {
  it('Renders', () => {
    render(
      <KuberaThemeProvider platform="kubera-chaos">
        <InputField
          label="primary"
          variant="primary"
          type="text"
          disabled={false}
          startIcon={null}
          endIcon={null}
          onChange={() => console.log('change')}
        />
      </KuberaThemeProvider>
    );
    //get OutlinedInput byRole
    const input = screen.getByRole('OutlinedInput');
    //get input from OutlinedInput
    const inputValue = input.querySelector('input') as HTMLElement;
    //check attributes
    expect(inputValue).toHaveProperty('type', 'text');
    expect(inputValue).toHaveProperty('disabled', false);
    expect(inputValue).toHaveProperty('value', '');
    //pass text value
    fireEvent.change(inputValue, { target: { value: 'random text' } });
    //check passed text value
    expect(inputValue).toHaveProperty('value', 'random text');
    //change input type
    fireEvent.change(inputValue, { target: { type: 'password' } });
    //check input type
    expect(inputValue).toHaveProperty('type', 'password');
  });
});
