import React from 'react';
import { useField } from 'formik';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export interface UIBooleanFieldProps {
  name: string;
  disabled: boolean;
  label?: string;
  size?: 'medium' | 'small';
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
  color?: 'default' | 'primary' | 'secondary';
}

export function UIBooleanField({ name, disabled, ...props }: UIBooleanFieldProps): JSX.Element {
  const [field] = useField<boolean>(name);

  const { value, onChange, onBlur } = field;

  const label = props.label || '';
  const size = props.size || 'small';
  const labelPlacement = props.labelPlacement || 'end';
  const color = props.color || 'primary';

  return (
    <Box pb={1} pr={2} pl={2}>
      <FormControlLabel
        disabled={disabled}
        label={label}
        labelPlacement={labelPlacement}
        control={
          <Switch
            name={name}
            value={value}
            checked={value}
            size={size}
            color={color}
            onChange={onChange}
            onBlur={onBlur}
          />
        }
      />
    </Box>
  );
}
