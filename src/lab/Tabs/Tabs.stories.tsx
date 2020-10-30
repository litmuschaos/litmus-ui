import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../../src/utils/storybook';
import Tabs from './Tabs';

storiesOf('Tabs', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal">
      <Tabs
        value="0"
        onChange={() => {
          console.log(true);
        }}
        label={['Workflow', 'Hubs']}
        content={['Workflow Content', 'Hubs Content']}
      ></Tabs>
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos">
      <Tabs
        value="0"
        onChange={() => {
          console.log(true);
        }}
        label={['Workflow', 'Hubs']}
        content={['Workflow Content', 'Hubs Content']}
      ></Tabs>
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel">
      <Tabs
        value="0"
        onChange={() => {
          console.log(true);
        }}
        label={['Workflow', 'Hubs']}
        content={['Workflow Content', 'Hubs Content']}
      ></Tabs>
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal">
      <Tabs
        value="0"
        onChange={() => {
          console.log(true);
        }}
        label={['Workflow', 'Hubs']}
        content={['Workflow Content', 'Hubs Content']}
      ></Tabs>
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core">
      <Tabs
        value="0"
        onChange={() => {
          console.log(true);
        }}
        label={['Workflow', 'Hubs']}
        content={['Workflow Content', 'Hubs Content']}
      ></Tabs>
    </ThemedBackground>
  ));
