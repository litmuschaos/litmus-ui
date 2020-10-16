import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../../utils/storybook';
import { ButtonFilled } from '../ButtonFilled';

storiesOf('Button/Button Filled', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <ButtonFilled variant="default" onClick={() => console.log('clicked')}>
        Button Filled Default
      </ButtonFilled>

      <ButtonFilled variant="error" onClick={() => console.log('clicked')}>
        Button Filled Error
      </ButtonFilled>

      <ButtonFilled variant="success" onClick={() => console.log('clicked')}>
        Button Filled Success
      </ButtonFilled>

      <ButtonFilled disabled onClick={() => console.log('clicked')}>
        Button Filled Disabled
      </ButtonFilled>
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <ButtonFilled variant="default" onClick={() => console.log('clicked')}>
        Button Filled Default
      </ButtonFilled>

      <ButtonFilled variant="error" onClick={() => console.log('clicked')}>
        Button Filled Error
      </ButtonFilled>

      <ButtonFilled variant="success" onClick={() => console.log('clicked')}>
        Button Filled Success
      </ButtonFilled>

      <ButtonFilled disabled onClick={() => console.log('clicked')}>
        Button Filled Disabled
      </ButtonFilled>
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <ButtonFilled variant="default" onClick={() => console.log('clicked')}>
        Button Filled Default
      </ButtonFilled>

      <ButtonFilled variant="error" onClick={() => console.log('clicked')}>
        Button Filled Error
      </ButtonFilled>

      <ButtonFilled variant="success" onClick={() => console.log('clicked')}>
        Button Filled Success
      </ButtonFilled>

      <ButtonFilled disabled onClick={() => console.log('clicked')}>
        Button Filled Disabled
      </ButtonFilled>
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <ButtonFilled variant="default" onClick={() => console.log('clicked')}>
        Button Filled Default
      </ButtonFilled>

      <ButtonFilled variant="error" onClick={() => console.log('clicked')}>
        Button Filled Error
      </ButtonFilled>

      <ButtonFilled variant="success" onClick={() => console.log('clicked')}>
        Button Filled Success
      </ButtonFilled>

      <ButtonFilled disabled onClick={() => console.log('clicked')}>
        Button Filled Disabled
      </ButtonFilled>
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <ButtonFilled variant="default" onClick={() => console.log('clicked')}>
        Button Filled Default
      </ButtonFilled>

      <ButtonFilled variant="error" onClick={() => console.log('clicked')}>
        Button Filled Error
      </ButtonFilled>

      <ButtonFilled variant="success" onClick={() => console.log('clicked')}>
        Button Filled Success
      </ButtonFilled>

      <ButtonFilled disabled onClick={() => console.log('clicked')}>
        Button Filled Disabled
      </ButtonFilled>
    </ThemedBackground>
  ));
