import React from 'react';
import Box from '@material-ui/core/Box';
import { UIFactory } from '../ui-factory';
import { UIElement, UIElementProps } from '../../types';

interface UIBoxProps extends UIElementProps {
  elements: Array<UIElement>;
  direction?: 'row' | 'column';
}

export function UIBox({ elements, ...props }: UIBoxProps): JSX.Element {
  const { direction = 'row', ...boxProps } = props;

  return (
    <Box display="flex" flexDirection={direction} {...boxProps}>
      {elements.map((el, index) => (
        <UIFactory key={index} element={el} />
      ))}
    </Box>
  );
}
