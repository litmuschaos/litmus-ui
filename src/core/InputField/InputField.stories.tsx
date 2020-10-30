import { AccountCircle } from '@material-ui/icons';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../utils/storybook';
import { InputField } from '../InputField';
storiesOf('InputField', module)
  // Litmus Portal
  .add('Litmus Portal', () => (
    <ThemedBackground platform="litmus-portal" row>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          onChange={(e) => e.target.value}
        />
        <InputField label="disabled" variant="primary" disabled={true} />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="password"
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          startIcon={<AccountCircle />}
          value="Input with password type and start icon"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with Start adornment"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with End adornment"
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with both adornment"
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
          label="primary"
          variant="primary"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          onChange={(e) => e.target.value}
        />
        <InputField label="disabled" variant="primary" disabled={true} />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="password"
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          startIcon={<AccountCircle />}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with Start adornment"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with End adornment"
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with both adornment"
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
          label="primary"
          variant="primary"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          onChange={(e) => e.target.value}
        />
        <InputField label="disabled" variant="primary" disabled={true} />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="password"
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          startIcon={<AccountCircle />}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with Start adornment"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with End adornment"
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with both adornment"
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
          label="primary"
          variant="primary"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          onChange={(e) => e.target.value}
        />
        <InputField label="disabled" variant="primary" disabled={true} />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="password"
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          startIcon={<AccountCircle />}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with Start adornment"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with End adornment"
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with both adornment"
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
          label="primary"
          variant="primary"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="error"
          variant="error"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="success"
          variant="success"
          onChange={(e) => e.target.value}
        />
        <InputField label="disabled" variant="primary" disabled={true} />
      </div>
      <div style={{ display: 'grid', gridGap: '20px' }}>
        <InputField
          label="primary"
          variant="primary"
          type="password"
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          type="password"
          startIcon={<AccountCircle />}
          value="Input with password type"
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with Start adornment"
          startIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with End adornment"
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
        <InputField
          label="primary"
          variant="primary"
          value="Input with both adornment"
          startIcon={<AccountCircle />}
          endIcon={<AccountCircle />}
          onChange={(e) => e.target.value}
        />
      </div>
    </ThemedBackground>
  ));
