import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../../utils/storybook';
import { Header } from './Header';

storiesOf('Text/HeaderText', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <Header>Header Text</Header>
      <Header variant="bold">Header Text</Header>
      <Header color={'green'}>Header Text</Header>
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <Header>Header Text</Header>
      <Header variant="bold">Header Text</Header>
      <Header color={'green'}>Header Text</Header>
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <Header>Header Text</Header>
      <Header variant="bold">Header Text</Header>
      <Header color={'green'}>Header Text</Header>
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <Header>Header Text</Header>
      <Header variant="bold">Header Text</Header>
      <Header color={'green'}>Header Text</Header>
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <Header>Header Text</Header>
      <Header variant="bold">Header Text</Header>
      <Header color={'green'}>Header Text</Header>
    </ThemedBackground>
  ));
