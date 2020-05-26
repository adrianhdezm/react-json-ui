import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useFormikContext } from 'formik';
import { UIElementProps } from '../../types';

interface UIButtonProps extends UIElementProps {
  value: string;
  disabled: boolean;
  type?: 'submit' | 'button' | 'reset';
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
}

export function UIButton({ value, disabled: propDisabled, ...props }: UIButtonProps): JSX.Element {
  const { isValid } = useFormikContext();

  const {
    type = 'button',
    size = 'medium',
    variant = 'contained',
    color = 'primary',
    ...boxProps
  } = props;

  const disabled = propDisabled || (type === 'submit' && !isValid);

  return (
    <Box p={1} {...boxProps}>
      <Button type={type} disabled={disabled} size={size} variant={variant} color={color}>
        {value}
      </Button>
    </Box>
  );
}
