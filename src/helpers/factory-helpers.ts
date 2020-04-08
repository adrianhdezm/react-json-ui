import { UIElement, UIBasicElement, UIControlElement, UIContainerElement } from '../types';
import { UIControlRegistry, UIBasicRegistry, UIContainerRegistry } from '../ui-element-registry';

export function isBasicElement(element: UIElement): element is UIBasicElement {
  return Object.keys(UIBasicRegistry).includes(element.component);
}

export function isControlElement(element: UIElement): element is UIControlElement {
  return Object.keys(UIControlRegistry).includes(element.component);
}

export function isContainerElement(element: UIElement): element is UIContainerElement {
  return Object.keys(UIContainerRegistry).includes(element.component);
}
