import React from 'react';
import Tabs from '../Tabs';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { KuberaThemeProvider } from '../../../theme';

afterEach(cleanup);
jest.useFakeTimers();

describe('Tabs', () => {
  it('Renders', () => {
    const { getByText } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <Tabs
          value={'1'}
          onChange={() => {
            console.log(true);
          }}
          label={['Tab Item', 'Tab Item two']}
          content={['Tab Content', 'Item two content']}
        ></Tabs>
      </KuberaThemeProvider>
    );
    fireEvent.click(getByText('Tab Item two'));
    expect(screen.getByText('Item two content')).toBeTruthy();
  });
});
