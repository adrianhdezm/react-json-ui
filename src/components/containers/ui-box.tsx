import React from 'react';
import Box from '@material-ui/core/Box';
import { UIFactory } from '../ui-factory';
import { UIElement } from '../../types';

interface UIBoxProps {
  elements: Array<UIElement>;
  direction?: 'row' | 'column';
}

export function UIBox({ elements, ...props }: UIBoxProps): JSX.Element {
  const direction = props.direction || 'row';

  return (
    <Box display="flex" flexDirection={direction}>
      {elements.map((el, index) => (
        <UIFactory key={index} element={el} />
      ))}
    </Box>
  );
}
