import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemedBackground } from '../../../utils/storybook';
import { Subtitle } from './Subtitle';

storiesOf('Text/SubtitleText', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <Subtitle>Subtitle Text</Subtitle>
      <Subtitle color={'green'}>Subtitle Text</Subtitle>
      <Subtitle variant="small">Subtitle Text</Subtitle>
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <Subtitle>Subtitle Text</Subtitle>
      <Subtitle color={'green'}>Subtitle Text</Subtitle>
      <Subtitle variant="small">Subtitle Text</Subtitle>
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <Subtitle>Subtitle Text</Subtitle>
      <Subtitle color={'green'}>Subtitle Text</Subtitle>
      <Subtitle variant="small">Subtitle Text</Subtitle>
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <Subtitle>Subtitle Text</Subtitle>
      <Subtitle color={'green'}>Subtitle Text</Subtitle>
      <Subtitle variant="small">Subtitle Text</Subtitle>
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <Subtitle>Subtitle Text</Subtitle>
      <Subtitle color={'green'}>Subtitle Text</Subtitle>
      <Subtitle variant="small">Subtitle Text</Subtitle>
    </ThemedBackground>
  ));
