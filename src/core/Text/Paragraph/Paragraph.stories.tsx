import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../../utils/storybook';
import { Paragraph } from './Paragraph';

storiesOf('Text/ParagraphText', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <Paragraph>Paragraph Text</Paragraph>
      <Paragraph color={'green'}>Paragraph Text</Paragraph>
      <Paragraph variant="small">Paragraph Text</Paragraph>
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <Paragraph>Paragraph Text</Paragraph>
      <Paragraph color={'green'}>Paragraph Text</Paragraph>
      <Paragraph variant="small">Paragraph Text</Paragraph>
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <Paragraph>Paragraph Text</Paragraph>
      <Paragraph color={'green'}>Paragraph Text</Paragraph>
      <Paragraph variant="small">Paragraph Text</Paragraph>
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <Paragraph>Paragraph Text</Paragraph>
      <Paragraph color={'green'}>Paragraph Text</Paragraph>
      <Paragraph variant="small">Paragraph Text</Paragraph>
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <Paragraph>Paragraph Text</Paragraph>
      <Paragraph color={'green'}>Paragraph Text</Paragraph>
      <Paragraph variant="small">Paragraph Text</Paragraph>
    </ThemedBackground>
  ));
