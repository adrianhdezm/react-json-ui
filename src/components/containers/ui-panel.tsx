import React from 'react';
import { UIFactory } from '../ui-factory';
import { UIElement, UIElementProps } from '../../types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

interface UIPanelProps extends UIElementProps {
  elements: Array<UIElement>;
  variant?: 'elevation' | 'outlined';
  elevation?: number;
  square?: boolean;
}

export function UIPanel({ elements, ...props }: UIPanelProps): JSX.Element {
  const { variant = 'elevation', elevation = 1, square = false, ...boxProps } = props;

  return (
    <Box {...boxProps}>
      <Paper square={square} elevation={elevation} variant={variant}>
        {elements.map((el, index) => (
          <UIFactory key={index} element={el} />
        ))}
      </Paper>
    </Box>
  );
}
