import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../../utils/storybook';
import { OutlinedPills } from '../../Pills';

storiesOf('Pills/Outlined Pills', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal">
      <OutlinedPills label="Outlined Pill" />
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos">
      <OutlinedPills label="Outlined Pill" />
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel">
      <OutlinedPills label="Outlined Pill" />
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal">
      <OutlinedPills label="Outlined Pill" />
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core">
      <OutlinedPills label="Outlined Pill" />
    </ThemedBackground>
  ));
