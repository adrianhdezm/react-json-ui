import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import Box from '@material-ui/core/Box';

interface UIIconProps {
  value: string;
  disabled: boolean;
  color?: 'primary' | 'secondary' | 'action' | 'error' | 'disabled';
  fontSize?: 'default' | 'small' | 'large';
}

export function UIIcon({ value, disabled, ...props }: UIIconProps): JSX.Element {
  const color = props.color || 'primary';
  const fontSize = props.fontSize || 'small';

  return (
    <Box p={1}>
      <SvgIcon color={color} fontSize={fontSize}>
        <path d={value} />
      </SvgIcon>
    </Box>
  );
}
