import RadioGroup from '@material-ui/core/RadioGroup';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { ThemedBackground } from '../../../src/utils/storybook';
import { RadioButton } from '../RadioButton';

storiesOf('RadioButton', module)
  // Litmus Portal
  .add('Litmus Portal', () => {
    const [selected, setSelected] = useState('A');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(event.target.value);
    };

    return (
      <ThemedBackground platform="litmus-portal">
        <h2>Radio Buttons with Radio Group</h2>
        <RadioGroup
          name="cluster options"
          value={selected}
          onChange={handleChange}
          row
        >
          <RadioButton value="A" onChange={handleChange}>
            Cluster A
          </RadioButton>
          <RadioButton value="B" onChange={handleChange}>
            Cluster B
          </RadioButton>
          <RadioButton value="C" onChange={handleChange}>
            Cluster C
          </RadioButton>
          <RadioButton disabled={true} checked={false}>
            Target cluster
          </RadioButton>
        </RadioGroup>

        <h2>Radio Buttons without Radio Group</h2>
        <RadioButton
          checked={selected === 'A'}
          value="A"
          onChange={handleChange}
        >
          Cluster A
        </RadioButton>
        <RadioButton
          checked={selected === 'B'}
          value="B"
          onChange={handleChange}
        >
          Cluster B
        </RadioButton>
        <RadioButton
          checked={selected === 'C'}
          value="C"
          onChange={handleChange}
        >
          Cluster C
        </RadioButton>
      </ThemedBackground>
    );
  })

  // Kubera Chaos
  .add('Kubera Chaos', () => {
    const [selected, setSelected] = useState('A');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(event.target.value);
    };

    return (
      <ThemedBackground platform="kubera-chaos">
        <h2>Radio Buttons with Radio Group</h2>
        <RadioGroup
          name="cluster options"
          value={selected}
          onChange={handleChange}
          row
        >
          <RadioButton value="A" onChange={handleChange}>
            Cluster A
          </RadioButton>
          <RadioButton value="B" onChange={handleChange}>
            Cluster B
          </RadioButton>
          <RadioButton value="C" onChange={handleChange}>
            Cluster C
          </RadioButton>
          <RadioButton disabled={true} checked={false}>
            Target cluster
          </RadioButton>
        </RadioGroup>

        <h2>Radio Buttons without Radio Group</h2>
        <RadioButton
          checked={selected === 'A'}
          value="A"
          onChange={handleChange}
        >
          Cluster A
        </RadioButton>
        <RadioButton
          checked={selected === 'B'}
          value="B"
          onChange={handleChange}
        >
          Cluster B
        </RadioButton>
        <RadioButton
          checked={selected === 'C'}
          value="C"
          onChange={handleChange}
        >
          Cluster C
        </RadioButton>
      </ThemedBackground>
    );
  })

  // Kubera Propel
  .add('Kubera Propel', () => {
    const [selected, setSelected] = useState('A');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(event.target.value);
    };

    return (
      <ThemedBackground platform="kubera-propel">
        <h2>Radio Buttons with Radio Group</h2>
        <RadioGroup
          name="cluster options"
          value={selected}
          onChange={handleChange}
          row
        >
          <RadioButton value="A" onChange={handleChange}>
            Cluster A
          </RadioButton>
          <RadioButton value="B" onChange={handleChange}>
            Cluster B
          </RadioButton>
          <RadioButton value="C" onChange={handleChange}>
            Cluster C
          </RadioButton>
          <RadioButton disabled={true} checked={false}>
            Target cluster
          </RadioButton>
        </RadioGroup>

        <h2>Radio Buttons without Radio Group</h2>
        <RadioButton
          checked={selected === 'A'}
          value="A"
          onChange={handleChange}
        >
          Cluster A
        </RadioButton>
        <RadioButton
          checked={selected === 'B'}
          value="B"
          onChange={handleChange}
        >
          Cluster B
        </RadioButton>
        <RadioButton
          checked={selected === 'C'}
          value="C"
          onChange={handleChange}
        >
          Cluster C
        </RadioButton>
      </ThemedBackground>
    );
  })

  // Kubera Portal
  .add('Kubera Portal', () => {
    const [selected, setSelected] = useState('A');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(event.target.value);
    };

    return (
      <ThemedBackground platform="kubera-portal">
        <h2>Radio Buttons with Radio Group</h2>
        <RadioGroup
          name="cluster options"
          value={selected}
          onChange={handleChange}
          row
        >
          <RadioButton value="A" onChange={handleChange}>
            Cluster A
          </RadioButton>
          <RadioButton value="B" onChange={handleChange}>
            Cluster B
          </RadioButton>
          <RadioButton value="C" onChange={handleChange}>
            Cluster C
          </RadioButton>
          <RadioButton disabled={true} checked={false}>
            Target cluster
          </RadioButton>
        </RadioGroup>

        <h2>Radio Buttons without Radio Group</h2>
        <RadioButton
          checked={selected === 'A'}
          value="A"
          onChange={handleChange}
        >
          Cluster A
        </RadioButton>
        <RadioButton
          checked={selected === 'B'}
          value="B"
          onChange={handleChange}
        >
          Cluster B
        </RadioButton>
        <RadioButton
          checked={selected === 'C'}
          value="C"
          onChange={handleChange}
        >
          Cluster C
        </RadioButton>
      </ThemedBackground>
    );
  })

  // Kubera Core
  .add('Kubera Core', () => {
    const [selected, setSelected] = useState('A');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(event.target.value);
    };

    return (
      <ThemedBackground platform="kubera-core">
        <h2>Radio Buttons with Radio Group</h2>
        <RadioGroup
          name="cluster options"
          value={selected}
          onChange={handleChange}
          row
        >
          <RadioButton value="A" onChange={handleChange}>
            Cluster A
          </RadioButton>
          <RadioButton value="B" onChange={handleChange}>
            Cluster B
          </RadioButton>
          <RadioButton value="C" onChange={handleChange}>
            Cluster C
          </RadioButton>
          <RadioButton disabled={true} checked={false}>
            Target cluster
          </RadioButton>
        </RadioGroup>

        <h2>Radio Buttons without Radio Group</h2>
        <RadioButton
          checked={selected === 'A'}
          value="A"
          onChange={handleChange}
        >
          Cluster A
        </RadioButton>
        <RadioButton
          checked={selected === 'B'}
          value="B"
          onChange={handleChange}
        >
          Cluster B
        </RadioButton>
        <RadioButton
          checked={selected === 'C'}
          value="C"
          onChange={handleChange}
        >
          Cluster C
        </RadioButton>
      </ThemedBackground>
    );
  });
