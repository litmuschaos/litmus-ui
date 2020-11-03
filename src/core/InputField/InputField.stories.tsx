import { AccountCircle } from '@material-ui/icons';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../utils/storybook';
import { InputField } from './InputField';
storiesOf('InputField', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="Normal text field"
          variant="primary"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Password field"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Error"
          variant="error"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Success"
          variant="success"
          onChange={(e) => e.target.value}
        />
        <InputField label="Disabled" variant="primary" disabled />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="Input with password type"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with password type and start icon"
          variant="primary"
          type="password"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with Start adornment"
          variant="primary"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with End adornment"
          variant="primary"
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with both adornment"
          variant="primary"
          startIcon={<AccountCircle />}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
      </div>
    </ThemedBackground>
  ))

  // Kubera Chaos
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos" row>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="Normal text field"
          variant="primary"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Password field"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Error"
          variant="error"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Success"
          variant="success"
          onChange={(e) => e.target.value}
        />
        <InputField label="Disabled" variant="primary" disabled />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="Input with password type"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with password type and start icon"
          variant="primary"
          type="password"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with Start adornment"
          variant="primary"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with End adornment"
          variant="primary"
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with both adornment"
          variant="primary"
          startIcon={<AccountCircle />}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
      </div>
    </ThemedBackground>
  ))

  // Kubera Propel
  .add('Kubera Propel', () => (
    <ThemedBackground platform="kubera-propel" row>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="Normal text field"
          variant="primary"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Password field"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Error"
          variant="error"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Success"
          variant="success"
          onChange={(e) => e.target.value}
        />
        <InputField label="Disabled" variant="primary" disabled />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="Input with password type"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with password type and start icon"
          variant="primary"
          type="password"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with Start adornment"
          variant="primary"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with End adornment"
          variant="primary"
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with both adornment"
          variant="primary"
          startIcon={<AccountCircle />}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
      </div>
    </ThemedBackground>
  ))

  // Kubera Core
  .add('Kubera Core', () => (
    <ThemedBackground platform="kubera-core" row>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="Normal text field"
          variant="primary"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Password field"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Error"
          variant="error"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Success"
          variant="success"
          onChange={(e) => e.target.value}
        />
        <InputField label="Disabled" variant="primary" disabled />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="Input with password type"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with password type and start icon"
          variant="primary"
          type="password"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with Start adornment"
          variant="primary"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with End adornment"
          variant="primary"
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with both adornment"
          variant="primary"
          startIcon={<AccountCircle />}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
      </div>
    </ThemedBackground>
  ))

  // Kubera Portal
  .add('Kubera Portal', () => (
    <ThemedBackground platform="kubera-portal" row>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="Normal text field"
          variant="primary"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Password field"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Error"
          variant="error"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Success"
          variant="success"
          onChange={(e) => e.target.value}
        />
        <InputField label="Disabled" variant="primary" disabled />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="Input with password type"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with password type and start icon"
          variant="primary"
          type="password"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with Start adornment"
          variant="primary"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with End adornment"
          variant="primary"
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="Input with both adornment"
          variant="primary"
          startIcon={<AccountCircle />}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
      </div>
    </ThemedBackground>
  ));
