import React from 'react';
import { UIFactory } from '../ui-factory';
import { UIElement } from '../../types';
import Paper from '@material-ui/core/Paper';

interface UIPanelProps {
  elements: Array<UIElement>;
  variant?: 'elevation' | 'outlined';
  elevation?: number;
  square?: boolean;
}

export function UIPanel({ elements, ...props }: UIPanelProps): JSX.Element {
  const variant = props.variant || 'elevation';
  const elevation = props.elevation || 1;
  const square = props.square || false;

  return (
    <Paper square={square} elevation={elevation} variant={variant}>
      {elements.map((el, index) => (
        <UIFactory key={index} element={el} />
      ))}
    </Paper>
  );
}
