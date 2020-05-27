import { JSONSchema7 } from 'json-schema';
import { FormikErrors } from 'formik';
import Ajv from 'ajv';
import pointer from 'json-pointer';
import { Values, UIElement, UiSchemaError } from '../types';
import { uiSchemata } from '../ui-schemata';

const ajv = new Ajv({ allErrors: true, jsonPointers: true });

export const isValueValid = (value: Values, schema: JSONSchema7): boolean => {
  ajv.validate(value, schema);
  return Array.isArray(ajv.errors);
};

export const validateValues = (values: Values, schema: JSONSchema7): FormikErrors<Values> => {
  const enrichedSchema = enrichSchema(schema);

  ajv.validate(enrichedSchema, values);
  const errors = ajv.errors;
  if (!Array.isArray(errors)) {
    return {};
  }
  return errors.reduce((formikErrors, currentError) => {
    const { dataPath, message } = currentError;
    if (dataPath && dataPath !== '') {
      pointer.set(formikErrors, dataPath, message);
    }
    return formikErrors;
  }, {});
};

const enrichSchema = (schema: JSONSchema7) => {
  try {
    const required = pointer.get(schema, '/required');
    if (Array.isArray(required)) {
      required.forEach((propertyName: string) => {
        const property = pointer.get(schema, `/properties/${propertyName}`);
        if (property.type === 'string') {
          pointer.set(schema, `/properties/${propertyName}`, { ...property, minLength: 1 });
        }
      });
    }
    return schema;
  } catch (error) {
    return schema;
  }
};

export const isNumberProperty = (schema: JSONSchema7, name: string): boolean => {
  const property = pointer.get(schema, `/properties/${name}`);
  return property.type === 'number';
};

export const isArrayProperty = (schema: JSONSchema7, name: string): boolean => {
  const property = pointer.get(schema, `/properties/${name}`);
  return property.type === 'array';
};

export function validateUiSchema(uiSchema: UIElement): UiSchemaError | null {
  ajv.validate(uiSchemata as JSONSchema7, uiSchema);
  const errors = ajv.errors;
  if (!Array.isArray(errors)) {
    return null;
  }
  return { message: 'invalid UI Schema', errors };
}
