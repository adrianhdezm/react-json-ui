import React from 'react';
import { useFormikContext } from 'formik';
import { isControlElement, isContainerElement, isBasicElement } from '../helpers/factory-helpers';
import { UIElement, Values } from '../types';
import { UIElementRegistry } from '../ui-element-registry';
import { isValueValid } from '../helpers/schema-helpers';

interface UIFactoryProps {
  element: UIElement;
}

export function UIFactory({ element }: UIFactoryProps): JSX.Element | null {
  const { values } = useFormikContext<Values>();

  const { rules } = element;
  let disabled = false;
  if (rules) {
    const hideRule = rules.find((rule) => rule.effect === 'HIDE');
    if (hideRule) {
      const { reference, schema: hideRuleSchema } = hideRule.condition;
      if (isValueValid(values[reference], hideRuleSchema)) {
        return null;
      }
    }

    const disabledRule = rules.find((rule) => rule.effect === 'DISABLE');
    if (disabledRule) {
      const { reference, schema: disableRuleSchema } = disabledRule.condition;
      disabled = isValueValid(values[reference], disableRuleSchema);
    }
  }

  if (isControlElement(element)) {
    const { component, reference: name, options, props } = element;
    return React.createElement(
      UIElementRegistry[component],
      { name, options, disabled, ...props },
      null
    );
  } else if (isBasicElement(element)) {
    const { value, component, props } = element;
    return React.createElement(UIElementRegistry[component], { value, disabled, ...props }, null);
  } else if (isContainerElement(element)) {
    const { component, elements, props } = element;
    return React.createElement(UIElementRegistry[component], { elements, ...props }, null);
  } else {
    return null;
  }
}
