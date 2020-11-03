import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../../utils/storybook';
import { ButtonGroup } from './ButtonGroup';

storiesOf('Button/ButtonGroup', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <ButtonGroup variant="default" />
      <ButtonGroup variant="success" />
      <ButtonGroup variant="error" />
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <ButtonGroup variant="default" />
      <ButtonGroup variant="success" />
      <ButtonGroup variant="error" />
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <ButtonGroup variant="default" />
      <ButtonGroup variant="success" />
      <ButtonGroup variant="error" />
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <ButtonGroup variant="default" />
      <ButtonGroup variant="success" />
      <ButtonGroup variant="error" />
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <ButtonGroup variant="default" />
      <ButtonGroup variant="success" />
      <ButtonGroup variant="error" />
    </ThemedBackground>
  ));
