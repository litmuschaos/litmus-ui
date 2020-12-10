import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { ThemedBackground } from '../../utils/storybook';
import { ButtonFilled, ButtonOutlined } from '../Button';
import { Modal } from './Modal';

storiesOf('Modal/Base Modal', module)
  // Litmus Portal
  .add('Litmus Portal', () => {
    const [open, setOpen] = useState(false);
    return (
      <ThemedBackground platform="litmus-portal">
        <ButtonFilled onClick={() => setOpen(true)}>Open Modal</ButtonFilled>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          disableBackdropClick
          disableEscapeKeyDown
          modalActions={
            <ButtonOutlined onClick={() => setOpen(false)}>
              &#x2715;
            </ButtonOutlined>
          }
        >
          <div
            style={{
              padding: '2.5rem',
              fontSize: '2rem',
              marginBottom: '15rem',
            }}
          >
            Modal
          </div>
        </Modal>
      </ThemedBackground>
    );
  })

  // Kubera Chaos
  .add('Kubera Chaos', () => {
    const [open, setOpen] = useState(false);
    return (
      <ThemedBackground platform="kubera-chaos">
        <ButtonFilled onClick={() => setOpen(true)}>Open Modal</ButtonFilled>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          modalActions={
            <ButtonOutlined onClick={() => setOpen(false)}>
              &#x2715;
            </ButtonOutlined>
          }
        >
          <div
            style={{
              padding: '2.5rem',
              fontSize: '2rem',
              marginBottom: '15rem',
            }}
          >
            Modal
          </div>
        </Modal>
      </ThemedBackground>
    );
  })

  // Kubera Propel
  .add('Kubera Propel', () => {
    const [open, setOpen] = useState(false);
    return (
      <ThemedBackground platform="kubera-propel">
        <ButtonFilled onClick={() => setOpen(true)}>Open Modal</ButtonFilled>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          modalActions={
            <ButtonOutlined onClick={() => setOpen(false)}>
              &#x2715;
            </ButtonOutlined>
          }
        >
          <div
            style={{
              padding: '2.5rem',
              fontSize: '2rem',
              marginBottom: '15rem',
            }}
          >
            Modal
          </div>
        </Modal>
      </ThemedBackground>
    );
  })

  // Kubera Portal
  .add('Kubera Portal', () => {
    const [open, setOpen] = useState(false);
    return (
      <ThemedBackground platform="kubera-portal">
        <ButtonFilled onClick={() => setOpen(true)}>Open Modal</ButtonFilled>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          modalActions={
            <ButtonOutlined onClick={() => setOpen(false)}>
              &#x2715;
            </ButtonOutlined>
          }
        >
          <div
            style={{
              padding: '2.5rem',
              fontSize: '2rem',
              marginBottom: '15rem',
            }}
          >
            Modal
          </div>
        </Modal>
      </ThemedBackground>
    );
  })

  // Kubera Core
  .add('Kubera Core', () => {
    const [open, setOpen] = useState(false);
    return (
      <ThemedBackground platform="kubera-core">
        <ButtonFilled onClick={() => setOpen(true)}>Open Modal</ButtonFilled>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          modalActions={
            <ButtonOutlined onClick={() => setOpen(false)}>
              &#x2715;
            </ButtonOutlined>
          }
        >
          <div
            style={{
              padding: '2.5rem',
              fontSize: '2rem',
              marginBottom: '15rem',
            }}
          >
            Modal
          </div>
        </Modal>
      </ThemedBackground>
    );
  });
