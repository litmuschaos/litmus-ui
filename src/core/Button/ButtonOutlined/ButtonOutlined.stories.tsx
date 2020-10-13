import { storiesOf } from '@storybook/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../theme';
import { ButtonOutlined } from '../ButtonOutlined';

storiesOf('Button/Button Outlined', module)
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
          <ButtonOutlined handleClick={() => console.log('clicked')}>
            Button Outlined
          </ButtonOutlined>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonOutlined
            variant="highlight"
            handleClick={() => console.log('clicked')}
          >
            Button Highlight
          </ButtonOutlined>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonOutlined
            disabled={true}
            handleClick={() => console.log('clicked')}
          >
            Button Outlined Disabled
          </ButtonOutlined>
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
          <ButtonOutlined handleClick={() => console.log('clicked')}>
            Button Outlined
          </ButtonOutlined>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonOutlined
            variant="highlight"
            handleClick={() => console.log('clicked')}
          >
            Button Highlight
          </ButtonOutlined>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonOutlined
            disabled={true}
            handleClick={() => console.log('clicked')}
          >
            Button Outlined Disabled
          </ButtonOutlined>
        </div>
      </div>
    </KuberaThemeProvider>
  ));
