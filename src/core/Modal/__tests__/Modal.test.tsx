import { render } from '@testing-library/react';
import React from 'react';
import { KuberaThemeProvider } from '../../../theme';
import { Modal } from '../Modal';

describe('Modal Component', () => {
  it('Renders', () => {
    const { findByTitle } = render(
      <KuberaThemeProvider platform="kubera-chaos">
        <Modal open={true} onClose={() => console.log('clicked')}>
          <>Modal</>
        </Modal>
      </KuberaThemeProvider>
    );

    expect(findByTitle('Modal')).toBeTruthy();
  });
});
