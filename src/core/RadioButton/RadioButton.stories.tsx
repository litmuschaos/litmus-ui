import React from 'react';
import RadioButton from '../RadioButton';
import RadioGroup from '@material-ui/core/RadioGroup';
import { storiesOf } from '@storybook/react';
import { ThemedBackground } from '../../../src/utils/storybook';

storiesOf('RadioButton', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <RadioGroup row>
        <RadioButton value="1">Target cluster</RadioButton>
        <RadioButton value="2">Target cluster</RadioButton>
        <RadioButton value="3">Target cluster</RadioButton>
        <RadioButton disabled={true} checked={true}>
          Target cluster
        </RadioButton>
      </RadioGroup>
      <RadioButton value="1">Target cluster</RadioButton>
      <RadioButton value="2">Target cluster</RadioButton>
      <RadioButton value="3">Target cluster</RadioButton>
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <RadioGroup row>
        <RadioButton value="1">Target cluster</RadioButton>
        <RadioButton value="2">Target cluster</RadioButton>
        <RadioButton value="3">Target cluster</RadioButton>
        <RadioButton disabled={true} checked={true}>
          Target cluster
        </RadioButton>
      </RadioGroup>
      <RadioButton value="1">Target cluster</RadioButton>
      <RadioButton value="2">Target cluster</RadioButton>
      <RadioButton value="3">Target cluster</RadioButton>
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <RadioGroup row>
        <RadioButton value="1">Target cluster</RadioButton>
        <RadioButton value="2">Target cluster</RadioButton>
        <RadioButton value="3">Target cluster</RadioButton>
        <RadioButton disabled={true} checked={true}>
          Target cluster
        </RadioButton>
      </RadioGroup>
      <RadioButton value="1">Target cluster</RadioButton>
      <RadioButton value="2">Target cluster</RadioButton>
      <RadioButton value="3">Target cluster</RadioButton>
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <RadioGroup row>
        <RadioButton value="1">Target cluster</RadioButton>
        <RadioButton value="2">Target cluster</RadioButton>
        <RadioButton value="3">Target cluster</RadioButton>
        <RadioButton disabled={true} checked={true}>
          Target cluster
        </RadioButton>
      </RadioGroup>
      <RadioButton value="1">Target cluster</RadioButton>
      <RadioButton value="2">Target cluster</RadioButton>
      <RadioButton value="3">Target cluster</RadioButton>
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <RadioGroup row>
        <RadioButton value="1">Target cluster</RadioButton>
        <RadioButton value="2">Target cluster</RadioButton>
        <RadioButton value="3">Target cluster</RadioButton>
        <RadioButton disabled={true} checked={true}>
          Target cluster
        </RadioButton>
      </RadioGroup>
      <RadioButton value="1">Target cluster</RadioButton>
      <RadioButton value="2">Target cluster</RadioButton>
      <RadioButton value="3">Target cluster</RadioButton>
    </ThemedBackground>
  ));
