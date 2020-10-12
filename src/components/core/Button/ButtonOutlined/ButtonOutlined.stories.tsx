import { storiesOf } from '@storybook/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../../theme';
import {
  ButtonOutlinedDefault,
  ButtonOutlinedHighlight,
} from '../ButtonOutlined';

storiesOf('Button', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <KuberaThemeProvider platform="litmus-portal">
      <div
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ margin: '1rem 1rem' }}>
          <ButtonOutlinedDefault handleClick={() => console.log('clicked')}>
            Button Outlined
          </ButtonOutlinedDefault>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonOutlinedHighlight handleClick={() => console.log('clicked')}>
            Button Highlight
          </ButtonOutlinedHighlight>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonOutlinedDefault
            isDisabled={true}
            handleClick={() => console.log('clicked')}
          >
            Button Outlined Disabled
          </ButtonOutlinedDefault>
        </div>
      </div>
    </KuberaThemeProvider>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <KuberaThemeProvider platform="kubera-chaos">
      <div
        style={{
          background:
            'linear-gradient(67.59deg, #0F2625 -0.71%, #112826 24.2%, #172D2B 98.91%)',
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ margin: '1rem 1rem' }}>
          <ButtonOutlinedDefault handleClick={() => console.log('clicked')}>
            Button Outlined
          </ButtonOutlinedDefault>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonOutlinedHighlight handleClick={() => console.log('clicked')}>
            Button Highlight
          </ButtonOutlinedHighlight>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonOutlinedDefault
            isDisabled={true}
            handleClick={() => console.log('clicked')}
          >
            Button Outlined Disabled
          </ButtonOutlinedDefault>
        </div>
      </div>
    </KuberaThemeProvider>
  ));
