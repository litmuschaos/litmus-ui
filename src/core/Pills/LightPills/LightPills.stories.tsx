import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../../utils/storybook';
import { LightPills } from '../LightPills';

storiesOf('Pills/Light Pills', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <LightPills variant="success" label="Success" />
      <LightPills variant="warning" label="Warning" />
      <LightPills variant="danger" label="Danger" />
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <LightPills variant="success" label="Success" />
      <LightPills variant="warning" label="Warning" />
      <LightPills variant="danger" label="Danger" />
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <LightPills variant="success" label="Success" />
      <LightPills variant="warning" label="Warning" />
      <LightPills variant="danger" label="Danger" />
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <LightPills variant="success" label="Success" />
      <LightPills variant="warning" label="Warning" />
      <LightPills variant="danger" label="Danger" />
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <LightPills variant="success" label="Success" />
      <LightPills variant="warning" label="Warning" />
      <LightPills variant="danger" label="Danger" />
    </ThemedBackground>
  ));
