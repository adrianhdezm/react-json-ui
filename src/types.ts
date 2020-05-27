/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSONSchema7 } from 'json-schema';

export interface UiSchemaError {
  message: string;
  errors: Array<{ keyword: string; dataPath: string; schemaPath: string; message?: string }>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Values = Record<string, any>;

export interface FieldOption {
  id: string;
  label: string;
}

export interface UIRule {
  effect: 'HIDE' | 'DISABLE';
  condition: {
    reference: string;
    schema: JSONSchema7;
  };
}

export type UIElement = UIBasicElement | UIContainerElement | UIControlElement;
interface UIAbstractElement {
  component: string;
  rules?: UIRule[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
}

export interface UIBasicElement extends UIAbstractElement {
  value: string;
}

export interface UIContainerElement extends UIAbstractElement {
  elements: Array<UIElement>;
}

export interface UIControlElement extends UIAbstractElement {
  reference: string;
  options?: FieldOption[];
}

export type UIElementProps = Partial<
  Record<
    | 'width'
    | 'maxWidth'
    | 'minWidth'
    | 'height'
    | 'maxHeight'
    | 'minHeight'
    | 'sizeWidth'
    | 'sizeHeight'
    | 'boxSizing',
    any
  >
> &
  Partial<
    Record<
      | 'margin'
      | 'marginTop'
      | 'marginRight'
      | 'marginBottom'
      | 'marginLeft'
      | 'padding'
      | 'paddingTop'
      | 'paddingRight'
      | 'paddingBottom'
      | 'paddingLeft',
      any
    >
  > &
  Partial<Record<'zIndex' | 'position' | 'top' | 'right' | 'bottom' | 'left', any>>;
