import React, { useCallback } from 'react';
import { useField, isString } from 'formik';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import isValid from 'date-fns/isValid';
import { UIElementProps } from '../../types';

export interface UIDateTimeFieldProps extends UIElementProps {
  name: string;
  disabled: boolean;
  label?: string;
  margin?: 'dense' | 'normal';
  variant?: 'dialog' | 'inline' | 'static';
  format?: string;
  inputVariant?: 'standard' | 'outlined' | 'filled';
}

const useStyles = makeStyles(() =>
  createStyles({
    dateInput: {
      minWidth: 250,
      ['& .MuiInputBase-adornedEnd']: {
        paddingRight: 0
      },
      ['& .MuiIconButton-root']: {
        paddingLeft: 0
      }
    }
  })
);

export function UIDateTimeField({ name, disabled, ...props }: UIDateTimeFieldProps): JSX.Element {
  const classes = useStyles();
  const [field, meta, helpers] = useField<string>(name);

  const { value, onBlur } = field;

  const {
    label = '',
    variant = 'inline',
    margin = 'dense',
    inputVariant = 'outlined',
    format = 'dd/MM/yyyy',
    ...boxProps
  } = props;

  const handleChange = useCallback(
    (date: Date | null, value) => {
      if (date && isValid(date)) {
        helpers.setValue(date.toISOString());
      } else if (isString(value)) {
        helpers.setValue(value);
      } else {
        helpers.setValue('');
      }
    },
    [helpers]
  );

  const handleError = useCallback(
    (error) => {
      // handle as a side effect
      if (meta.error && error !== meta.error) {
        helpers.setError(error);
      }
    },
    [helpers, meta]
  );

  return (
    <Box p={1} {...boxProps}>
      <KeyboardDatePicker
        disabled={disabled}
        className={classes.dateInput}
        name={name}
        value={value}
        label={label}
        disableToolbar={true}
        variant={variant}
        autoOk={true}
        format={format}
        margin={margin}
        inputVariant={inputVariant}
        error={Boolean(meta.error)}
        onError={handleError}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </Box>
  );
}
