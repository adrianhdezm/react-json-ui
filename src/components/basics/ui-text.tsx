import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { UIElementProps } from '../../types';

interface UITextProps extends UIElementProps {
  value: string;
  disabled: boolean;
  color?: 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline';
}

export function UIText({ value, disabled, ...props }: UITextProps): JSX.Element {
  const { variant = 'body1', color = 'primary', ...boxProps } = props;

  return (
    <Box p={1} {...boxProps}>
      <Typography color={color} variant={variant}>
        {value}
      </Typography>
    </Box>
  );
}
