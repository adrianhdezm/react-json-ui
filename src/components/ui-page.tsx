import React, { useMemo, useCallback } from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { JSONSchema7 } from 'json-schema';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Values, UIElement } from '../types';
import { validateValues } from '../helpers/schema-helpers';
import { SchemaContext } from '../schema-context';
import { UIFactory } from './ui-factory';

interface UIPageProps {
  data: Values;
  schema: JSONSchema7;
  uiSchema: UIElement;
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void;
  onReset?: (values: Values, formikHelpers: FormikHelpers<Values>) => void;
}

export function UIPage({ data, schema, uiSchema, onSubmit, onReset }: UIPageProps): JSX.Element {
  const initialErrors = useMemo(() => {
    return validateValues(data, schema);
  }, [data, schema]);

  const handleValidation = useCallback((values) => validateValues(values, schema), [schema]);
  const handleKeyDown = useCallback((keyEvent) => {
    // Stop enter submitting the form.
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }, []);

  const page = useMemo(
    () => (props: FormikProps<Values>) => (
      <SchemaContext.Provider value={schema}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form
            role="presentation"
            onSubmit={props.handleSubmit}
            onReset={props.handleReset}
            onKeyDown={handleKeyDown}
          >
            <UIFactory element={uiSchema} />
          </form>
        </MuiPickersUtilsProvider>
      </SchemaContext.Provider>
    ),
    [uiSchema, schema, handleKeyDown]
  );

  return (
    <Formik
      initialValues={data}
      initialErrors={initialErrors}
      validate={handleValidation}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      {page}
    </Formik>
  );
}
