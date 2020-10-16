import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../../utils/storybook';
import { ButtonOutlined } from '../ButtonOutlined';

storiesOf('Button/Button Outlined', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <ButtonOutlined onClick={() => console.log('clicked')}>
        Button Outlined
      </ButtonOutlined>

      <ButtonOutlined
        variant="highlight"
        onClick={() => console.log('clicked')}
      >
        Button Highlight
      </ButtonOutlined>

      <ButtonOutlined disabled={true} onClick={() => console.log('clicked')}>
        Button Outlined Disabled
      </ButtonOutlined>
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <ButtonOutlined onClick={() => console.log('clicked')}>
        Button Outlined
      </ButtonOutlined>

      <ButtonOutlined
        variant="highlight"
        onClick={() => console.log('clicked')}
      >
        Button Highlight
      </ButtonOutlined>

      <ButtonOutlined disabled={true} onClick={() => console.log('clicked')}>
        Button Outlined Disabled
      </ButtonOutlined>
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <ButtonOutlined onClick={() => console.log('clicked')}>
        Button Outlined
      </ButtonOutlined>

      <ButtonOutlined
        variant="highlight"
        onClick={() => console.log('clicked')}
      >
        Button Highlight
      </ButtonOutlined>

      <ButtonOutlined disabled={true} onClick={() => console.log('clicked')}>
        Button Outlined Disabled
      </ButtonOutlined>
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <ButtonOutlined onClick={() => console.log('clicked')}>
        Button Outlined
      </ButtonOutlined>

      <ButtonOutlined
        variant="highlight"
        onClick={() => console.log('clicked')}
      >
        Button Highlight
      </ButtonOutlined>

      <ButtonOutlined disabled={true} onClick={() => console.log('clicked')}>
        Button Outlined Disabled
      </ButtonOutlined>
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <ButtonOutlined onClick={() => console.log('clicked')}>
        Button Outlined
      </ButtonOutlined>

      <ButtonOutlined
        variant="highlight"
        onClick={() => console.log('clicked')}
      >
        Button Highlight
      </ButtonOutlined>

      <ButtonOutlined disabled={true} onClick={() => console.log('clicked')}>
        Button Outlined Disabled
      </ButtonOutlined>
    </ThemedBackground>
  ));
