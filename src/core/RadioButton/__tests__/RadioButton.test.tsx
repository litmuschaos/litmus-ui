import React from 'react';
import RadioButton from '../../RadioButton';
import RadioGroup from '@material-ui/core/RadioGroup';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { KuberaThemeProvider } from '../../../theme';
import { screen } from '@testing-library/dom';

afterEach(cleanup);
jest.useFakeTimers();

describe('Radio Button Component', () => {
  it('Renders', () => {
    render(
      <KuberaThemeProvider platform="kubera-chaos">
        <RadioButton>Target cluster</RadioButton>
      </KuberaThemeProvider>
    );
    //get radio byRole
    const radio = screen.getByRole('radio');
    //check type
    expect(radio).toHaveProperty('type', 'radio');
    //check value
    expect(radio).toHaveProperty('value', '');
    //check checked attribute
    expect(radio).toHaveProperty('checked', false);
    //change checked value
    fireEvent.change(radio, { target: { checked: true } });
    //check checked changed value
    expect(radio).toHaveProperty('checked', true);
    //give text value
    fireEvent.change(radio, { target: { value: 'radio button text' } });
    //check given value
    expect(radio).toHaveProperty('value', 'radio button text');
  });
});

// Testing with RadioGroup ------------------------>

describe('when clicked', () => {
  it('should call a callback function', () => {
    const testFunction = jest.fn((value) => value);
    testFunction(1);
    const { getByTestId } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <RadioGroup
          data-testid="radiogroup"
          onChange={testFunction}
          name="contact"
          value={1}
        >
          <RadioButton id="1" value="email">
            E-mail
          </RadioButton>
          <RadioButton id="2" value="phone">
            Phone
          </RadioButton>
        </RadioGroup>
      </KuberaThemeProvider>
    );
    fireEvent.click(getByTestId('radiogroup'));
    expect(testFunction).toHaveBeenCalledTimes(1);
  });
});
