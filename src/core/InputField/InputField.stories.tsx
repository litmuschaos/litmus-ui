import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../utils/storybook';
import { InputField } from '../InputField';
import { AccountCircle } from '@material-ui/icons';
storiesOf('InputField', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="disabled"
          variant="primary"
          type="text"
          disabled={true}
          endIcon={null}
          startIcon={null}
        />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="password"
          disabled={false}
          startIcon={null}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          disabled={false}
          startIcon={<AccountCircle />}
          value="Input with password type and start icon"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with Start adornment"
          disabled={false}
          startIcon={<AccountCircle />}
          endIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with End adornment"
          disabled={false}
          startIcon={null}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with both adornment"
          disabled={false}
          startIcon={<AccountCircle />}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          type="text"
          value="Input with error type"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          type="text"
          value="Input with success type"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="disabled"
          variant="primary"
          type="text"
          disabled={true}
          endIcon={null}
          startIcon={null}
          value="disabled text"
        />
      </div>
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="disabled"
          variant="primary"
          type="text"
          disabled={true}
          endIcon={null}
          startIcon={null}
        />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="password"
          disabled={false}
          startIcon={null}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          disabled={false}
          startIcon={<AccountCircle />}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with Start adornment"
          disabled={false}
          startIcon={<AccountCircle />}
          endIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with End adornment"
          disabled={false}
          startIcon={null}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with both adornment"
          disabled={false}
          startIcon={<AccountCircle />}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          type="text"
          value="Input with error type"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          type="text"
          value="Input with success type"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="disabled"
          variant="primary"
          type="text"
          disabled={true}
          endIcon={null}
          startIcon={null}
          value="disabled text"
        />
      </div>
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="disabled"
          variant="primary"
          type="text"
          disabled={true}
          endIcon={null}
          startIcon={null}
        />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="password"
          disabled={false}
          startIcon={null}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          disabled={false}
          startIcon={<AccountCircle />}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with Start adornment"
          disabled={false}
          startIcon={<AccountCircle />}
          endIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with End adornment"
          disabled={false}
          startIcon={null}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with both adornment"
          disabled={false}
          startIcon={<AccountCircle />}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          type="text"
          value="Input with error type"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          type="text"
          value="Input with success type"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="disabled"
          variant="primary"
          type="text"
          disabled={true}
          endIcon={null}
          startIcon={null}
          value="disabled text"
        />
      </div>
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="disabled"
          variant="primary"
          type="text"
          disabled={true}
          endIcon={null}
          startIcon={null}
        />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="password"
          disabled={false}
          startIcon={null}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          disabled={false}
          startIcon={<AccountCircle />}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with Start adornment"
          disabled={false}
          startIcon={<AccountCircle />}
          endIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with End adornment"
          disabled={false}
          startIcon={null}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with both adornment"
          disabled={false}
          startIcon={<AccountCircle />}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          type="text"
          value="Input with error type"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          type="text"
          value="Input with success type"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="disabled"
          variant="primary"
          type="text"
          disabled={true}
          endIcon={null}
          startIcon={null}
          value="disabled text"
        />
      </div>
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          type="text"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="disabled"
          variant="primary"
          type="text"
          disabled={true}
          endIcon={null}
          startIcon={null}
        />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="password"
          disabled={false}
          startIcon={null}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          disabled={false}
          startIcon={<AccountCircle />}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with Start adornment"
          disabled={false}
          startIcon={<AccountCircle />}
          endIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with End adornment"
          disabled={false}
          startIcon={null}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="text"
          value="Input with both adornment"
          disabled={false}
          startIcon={<AccountCircle />}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          type="text"
          value="Input with error type"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          type="text"
          value="Input with success type"
          disabled={false}
          endIcon={null}
          startIcon={null}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="disabled"
          variant="primary"
          type="text"
          disabled={true}
          endIcon={null}
          startIcon={null}
          value="disabled text"
        />
      </div>
    </ThemedBackground>
  ));
