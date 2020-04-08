import { JSONSchema7 } from 'json-schema';

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
