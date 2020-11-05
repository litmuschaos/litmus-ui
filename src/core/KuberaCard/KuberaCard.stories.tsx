import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../utils/storybook';
import { KuberaCard } from '../KuberaCard';

const cardContainer = (content: string) => (
  <div
    style={{
      textAlign: 'center',
      marginTop: '50%',
      fontSize: '1.2rem',
    }}
  >
    {content}
  </div>
);

storiesOf('Card', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <KuberaCard width="15rem" height="20rem" borderColor="#5B44BA" glow>
        {cardContainer('Card With Glow')}
      </KuberaCard>
      <KuberaCard width="15rem" height="20rem" borderColor="#5B44BA">
        {cardContainer('Card Without Glow')}
      </KuberaCard>
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <KuberaCard width="15rem" height="20rem" borderColor="#28CB69" glow>
        {cardContainer('Card With Glow')}
      </KuberaCard>
      <KuberaCard width="15rem" height="20rem" borderColor="#28CB69">
        {cardContainer('Card Without Glow')}
      </KuberaCard>
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <KuberaCard width="15rem" height="20rem" borderColor="#EAD7A2" glow>
        {cardContainer('Card With Glow')}
      </KuberaCard>
      <KuberaCard width="15rem" height="20rem" borderColor="#EAD7A2">
        {cardContainer('Card Without Glow')}
      </KuberaCard>
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <KuberaCard width="15rem" height="20rem" borderColor="#DE7EDF" glow>
        {cardContainer('Card With Glow')}
      </KuberaCard>
      <KuberaCard width="15rem" height="20rem" borderColor="#DE7EDF">
        {cardContainer('Card Without Glow')}
      </KuberaCard>
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <KuberaCard width="15rem" height="20rem" borderColor="#C34FC5" glow>
        {cardContainer('Card With Glow')}
      </KuberaCard>
      <KuberaCard width="15rem" height="20rem" borderColor="#C34FC5">
        {cardContainer('Card Without Glow')}
      </KuberaCard>
    </ThemedBackground>
  ));
