import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../utils/storybook';
import { ProgressBar } from './ProgressBar';
import { useTheme } from '@material-ui/core/styles';

storiesOf('ProgressBar', module)
  // Litmus Portal

  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal">
      <ProgressBar
        value={80}
        label="Success"
        color={useTheme().palette.success.main}
      />
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos">
      <ProgressBar
        value={80}
        label="Success"
        color={useTheme().palette.success.main}
      />
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel">
      <ProgressBar
        value={80}
        label="Success"
        color={useTheme().palette.success.main}
      />
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal">
      <ProgressBar
        value={80}
        label="Success"
        color={useTheme().palette.success.main}
      />
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core">
      <ProgressBar
        value={80}
        label="Success"
        color={useTheme().palette.success.main}
      />
    </ThemedBackground>
  ));
