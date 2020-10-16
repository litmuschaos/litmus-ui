import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../../utils/storybook';
import { ToggleButton } from './ToggleButton';

storiesOf('Button/Button Hybrid', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <ToggleButton onClick={() => console.log('clicked')}>
        Button Hybrid
      </ToggleButton>
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <ToggleButton onClick={() => console.log('clicked')}>
        Button Hybrid
      </ToggleButton>
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <ToggleButton onClick={() => console.log('clicked')}>
        Button Hybrid
      </ToggleButton>
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <ToggleButton onClick={() => console.log('clicked')}>
        Button Hybrid
      </ToggleButton>
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <ToggleButton onClick={() => console.log('clicked')}>
        Button Hybrid
      </ToggleButton>
    </ThemedBackground>
  ));
