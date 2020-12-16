import React from 'react';
import { ButtonBaseProps } from '../base';
import { ButtonFilled } from '../ButtonFilled';
import { ButtonOutlined } from '../ButtonOutlined';

interface ToggleButtonProps extends ButtonBaseProps {
  isToggled: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isToggled,
  onClick,
  children,
  className,
}) => {
  return isToggled ? (
    <ButtonFilled variant="default" className={className} onClick={onClick}>
      {children}
    </ButtonFilled>
  ) : (
    <ButtonOutlined variant="highlight" className={className} onClick={onClick}>
      {children}
    </ButtonOutlined>
  );
};

export { ToggleButton };
