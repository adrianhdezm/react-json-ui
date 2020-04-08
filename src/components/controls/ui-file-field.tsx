import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useField } from 'formik';
import { useDropzone, DropzoneOptions } from 'react-dropzone';

export interface UIFileFieldProps {
  name: string;
  disabled: boolean;
  filesExtensions?: 'string';
  label?: string;
  size?: 'medium' | 'small' | 'large';
  color?: 'default' | 'primary' | 'secondary';
}

const useStyles = makeStyles(() =>
  createStyles({
    uploadWrapper: {
      display: 'inline-flex',
      padding: 8,
      border: '2px dashed rgba(0,0,0,0.54)'
    },
    uploadLabel: {
      marginLeft: 5
    }
  })
);

export function UIFileField({ name, disabled, ...props }: UIFileFieldProps): JSX.Element {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [, , helpers] = useField<object>(name);

  const label = props.label || null;
  const size = props.size || 'small';
  const color = props.color || 'primary';
  const filesExtensions = props.filesExtensions || 'image/*';

  const onDrop = useCallback(
    (files: File[]) => {
      helpers.setValue(files);
    },
    [helpers]
  );

  const dropZoneOptions: DropzoneOptions = { accept: filesExtensions, disabled, onDrop };

  const { getRootProps, getInputProps } = useDropzone(dropZoneOptions);

  return (
    <Box p={1}>
      <div className={classes.uploadWrapper} {...getRootProps()}>
        <input {...getInputProps()} />
        {label && label !== '' ? (
          <Fab variant="extended" size={size} color={color} disabled={disabled}>
            <CloudUploadIcon />
            <span className={classes.uploadLabel}>{label}</span>
          </Fab>
        ) : (
          <Fab variant="round" size={size} color={color} disabled={disabled}>
            <CloudUploadIcon />
          </Fab>
        )}
      </div>
    </Box>
  );
}
