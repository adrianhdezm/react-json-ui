import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import Box from '@material-ui/core/Box';
import { UIElementProps } from '../../types';

interface UIIconProps extends UIElementProps {
  value: string;
  disabled: boolean;
  color?: 'primary' | 'secondary' | 'action' | 'error' | 'disabled';
  fontSize?: 'default' | 'small' | 'large';
}

export function UIIcon({ value, disabled, ...props }: UIIconProps): JSX.Element {
  const { fontSize = 'small', color = 'primary', ...boxProps } = props;

  return (
    <Box p={1} {...boxProps}>
      <SvgIcon color={color} fontSize={fontSize}>
        <path d={value} />
      </SvgIcon>
    </Box>
  );
}
