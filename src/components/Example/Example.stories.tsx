import { storiesOf } from '@storybook/react';
import React from 'react';
import { KuberaThemeProvider } from '../../theme';
import Example from './Example';

storiesOf('Example', module)
  .add('Litmus Portal', () => (
    <KuberaThemeProvider platform="litmus-portal">
      <Example>Button</Example>
    </KuberaThemeProvider>
  ))
  .add('Kubera Chaos', () => (
    <KuberaThemeProvider platform="kubera-chaos">
      <Example>Button</Example>
    </KuberaThemeProvider>
  ));
