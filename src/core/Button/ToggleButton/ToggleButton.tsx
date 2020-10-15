import React, { useState } from 'react';
import { ButtonBaseProps } from '../base';
import { ButtonFilled } from '../ButtonFilled';
import { ButtonOutlined } from '../ButtonOutlined';

const ToggleButton: React.FC<ButtonBaseProps> = ({ onClick, children }) => {
  // Styles
  const [toggle, setToggle] = useState<boolean>(false);

  return toggle ? (
    <ButtonFilled
      variant="default"
      onClick={() => {
        onClick;
        setToggle(!toggle);
      }}
    >
      {children}
    </ButtonFilled>
  ) : (
    <ButtonOutlined
      variant="highlight"
      onClick={() => {
        onClick;
        setToggle(!toggle);
      }}
    >
      {children}
    </ButtonOutlined>
  );
};

export { ToggleButton };
