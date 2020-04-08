import React, { useCallback, useMemo, useContext } from 'react';
import { useField } from 'formik';
import { FieldOption } from '../../types';
import Box from '@material-ui/core/Box';
import Autocomplete, {
  AutocompleteRenderInputParams,
  AutocompleteGetTagProps
} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { isArrayProperty } from '../../helpers/schema-helpers';
import { SchemaContext } from '../../schema-context';
import Chip from '@material-ui/core/Chip';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface UISelectFieldProps {
  name: string;
  disabled: boolean;
  options: FieldOption[];
  label?: string;
  placeholder?: string;
  margin?: 'dense' | 'normal';
  variant?: 'standard' | 'outlined' | 'filled';
  fullWidth?: boolean;
  size?: 'medium' | 'small';
}

const useStyles = makeStyles(() =>
  createStyles({
    selectWrapper: {
      ['& .MuiChip-root']: {
        borderRadius: 3
      }
    }
  })
);

export function UISelectField({
  name,
  disabled,
  options,
  ...props
}: UISelectFieldProps): JSX.Element {
  const classes = useStyles();
  const schema = useContext(SchemaContext);
  const [field, meta, helpers] = useField<string | string[]>(name);
  const { value, onBlur } = field;

  const variant = props.variant || 'outlined';
  const margin = props.margin || 'dense';
  const fullWidth = props.fullWidth || false;
  const label = props.label || '';
  const placeholder = props.placeholder || '';
  const size = props.size || 'small';

  const getOptionLabel = (option: FieldOption) => option.label;

  const multiple = useMemo<boolean>(() => {
    return isArrayProperty(schema, name);
  }, [schema, name]);

  const handleChange = useCallback(
    (_event: React.ChangeEvent<Record<string, unknown>>, item: FieldOption | null) => {
      if (item) {
        helpers.setValue(item.id);
      } else {
        helpers.setValue('');
      }
    },
    [helpers]
  );
  const getValue = useMemo(() => {
    const newValue = options.find((option) => option.id === value);
    return newValue || null;
  }, [value, options]);

  const handleMultipleChange = useCallback(
    (_event: React.ChangeEvent<Record<string, unknown>>, items: FieldOption[] | undefined) => {
      if (items) {
        helpers.setValue(items.map((item) => item.id));
      } else {
        helpers.setValue([]);
      }
    },
    [helpers]
  );

  const getMultipleValue = useMemo<FieldOption[] | undefined>(() => {
    if (!Array.isArray(value)) {
      return undefined;
    }
    const values = value.map((id) => options.find((option) => option.id === id)).filter(Boolean);
    return values as FieldOption[];
  }, [value, options]);

  const renderInput = useMemo(
    () => (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        style={{ minWidth: 250 }}
        error={Boolean(meta.error)}
        label={label}
        placeholder={placeholder}
        margin={margin}
        variant={variant}
        fullWidth={fullWidth}
        size={size}
      />
    ),
    [meta, label, placeholder, margin, variant, fullWidth, size]
  );

  const renderTags = useMemo(
    () => (values: FieldOption[], getTagProps: AutocompleteGetTagProps) =>
      values.map((option, index) => (
        <Chip
          key={index}
          variant="outlined"
          size="small"
          label={option.label}
          {...getTagProps({ index })}
        />
      )),
    []
  );

  return (
    <Box p={1}>
      {multiple ? (
        <Autocomplete
          className={classes.selectWrapper}
          multiple={true}
          options={options}
          value={getMultipleValue}
          disabled={disabled}
          getOptionLabel={getOptionLabel}
          onChange={handleMultipleChange}
          onBlur={onBlur}
          renderInput={renderInput}
          renderTags={renderTags}
        />
      ) : (
        <Autocomplete
          options={options}
          value={getValue}
          getOptionLabel={getOptionLabel}
          onChange={handleChange}
          onBlur={onBlur}
          renderInput={renderInput}
          disabled={disabled}
        />
      )}
    </Box>
  );
}
