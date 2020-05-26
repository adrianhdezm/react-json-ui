import React, { useCallback, useContext, useMemo } from 'react';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { SchemaContext } from '../../schema-context';
import { isNumberProperty, isArrayProperty } from '../../helpers/schema-helpers';
import { UIElementProps } from '../../types';

export interface UITextFieldProps extends UIElementProps {
  name: string;
  disabled: boolean;
  label?: string;
  placeholder?: string;
  margin?: 'dense' | 'normal';
  variant?: 'standard' | 'outlined' | 'filled';
  fullWidth?: boolean;
  size?: 'medium' | 'small';
}

export function UITextField({ name, disabled, ...props }: UITextFieldProps): JSX.Element {
  const [field, meta, helpers] = useField<string | number | string[]>(name);
  const schema = useContext(SchemaContext);

  const { value, onBlur } = field;

  const {
    label = '',
    size = 'small',
    variant = 'outlined',
    placeholder = '',
    fullWidth = false,
    margin = 'dense',
    ...boxProps
  } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      if (isArrayProperty(schema, name)) {
        const values = inputValue.split(',').map((value) => value.replace(/^\s+/, ''));
        helpers.setValue(values);
      } else {
        if (isNumberProperty(schema, name) && !isNaN(Number(inputValue)) && inputValue !== '') {
          helpers.setValue(Number(inputValue));
        } else {
          helpers.setValue(inputValue);
        }
      }
    },
    [name, helpers, schema]
  );

  const inputValue = useMemo(() => {
    return isArrayProperty(schema, name) ? (value as string[]).join(', ') : value;
  }, [value, schema, name]);

  return (
    <Box p={1} {...boxProps}>
      <TextField
        name={name}
        value={inputValue}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        error={Boolean(meta.error)}
        style={{ minWidth: 250 }}
        label={label}
        placeholder={placeholder}
        margin={margin}
        variant={variant}
        fullWidth={fullWidth}
        size={size}
      />
    </Box>
  );
}
