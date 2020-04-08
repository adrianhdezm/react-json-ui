import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useFormikContext } from 'formik';

interface UIButtonProps {
  value: string;
  disabled: boolean;
  type?: 'submit' | 'button' | 'reset';
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
}

export function UIButton({ value, disabled: propDisabled, ...props }: UIButtonProps): JSX.Element {
  const { isValid } = useFormikContext();

  const type = props.type || 'button';
  const size = props.size || 'medium';
  const variant = props.variant || 'contained';
  const color = props.color || 'primary';
  const disabled = propDisabled || (type === 'submit' && !isValid);

  return (
    <Box p={1}>
      <Button type={type} disabled={disabled} size={size} variant={variant} color={color}>
        {value}
      </Button>
    </Box>
  );
}
