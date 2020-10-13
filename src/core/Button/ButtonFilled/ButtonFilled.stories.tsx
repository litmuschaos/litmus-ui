import { storiesOf } from '@storybook/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../theme';
import { ButtonFilled } from '../ButtonFilled';

storiesOf('Button Filled', module)
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
          <ButtonFilled
            variant="default"
            handleClick={() => console.log('clicked')}
          >
            Button Filled Default
          </ButtonFilled>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonFilled
            variant="error"
            handleClick={() => console.log('clicked')}
          >
            Button Filled Error
          </ButtonFilled>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonFilled
            variant="success"
            handleClick={() => console.log('clicked')}
          >
            Button Filled Success
          </ButtonFilled>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonFilled
            disabled={true}
            handleClick={() => console.log('clicked')}
          >
            Button Filled Disabled
          </ButtonFilled>
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
          <ButtonFilled
            variant="default"
            handleClick={() => console.log('clicked')}
          >
            Button Filled Default
          </ButtonFilled>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonFilled
            variant="error"
            handleClick={() => console.log('clicked')}
          >
            Button Filled Error
          </ButtonFilled>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonFilled
            variant="success"
            handleClick={() => console.log('clicked')}
          >
            Button Filled Success
          </ButtonFilled>
        </div>

        <div style={{ margin: '1rem 1rem' }}>
          <ButtonFilled
            disabled={true}
            handleClick={() => console.log('clicked')}
          >
            Button Filled Disabled
          </ButtonFilled>
        </div>
      </div>
    </KuberaThemeProvider>
  ));
