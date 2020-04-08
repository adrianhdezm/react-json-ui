import React from 'react';
import { useField } from 'formik';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { FieldOption } from '../../types';

export interface UIRadioGroupFieldProps {
  name: string;
  disabled: boolean;
  options: FieldOption[];
  label?: string;
  size?: 'medium' | 'small';
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
  color?: 'default' | 'primary' | 'secondary';
  row?: boolean;
}

export function UIRadioGroupField({
  name,
  disabled,
  options,
  ...props
}: UIRadioGroupFieldProps): JSX.Element {
  const [field] = useField<string>(name);
  const { value, onChange, onBlur } = field;

  const label = props.label || '';
  const size = props.size || 'small';
  const labelPlacement = props.labelPlacement || 'end';
  const color = props.color || 'primary';
  const row = props.row || true;

  return (
    <Box p={1}>
      <FormControl component="fieldset" disabled={disabled}>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup name={name} value={value} row={row} onChange={onChange} onBlur={onBlur}>
          {options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              label={option.label}
              labelPlacement={labelPlacement}
              control={<Radio size={size} color={color} />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
