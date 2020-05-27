import React from 'react';
import { shallow } from 'enzyme';
import { UIPage } from '../src/components/ui-page';
import { UIElement } from '../src/types';
import { Formik } from 'formik';

describe('<UIPage />', () => {
  it('renders a empty elment with empty data, schema, and uiSchema', () => {
    const data = {};
    const schema = {};
    const uiSchema = {} as UIElement;
    const onSubmit = jest.fn();
    const onUiSchemaErrors = jest.fn();

    const wrapper = shallow(
      <UIPage
        data={data}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        onUiSchemaErrors={onUiSchemaErrors}
      />
    );

    expect(onUiSchemaErrors).toBeCalledWith(expect.anything());
    expect(wrapper.find(Formik).exists()).toBe(false);
  });

  it('renders a empty elment with empty data, schema, and invalid uiSchema', () => {
    const data = {};
    const schema = {};
    const uiSchema = {
      component: 'UIBox',
      elements: [{ component: 'UIInvalidText', value: 'Example Form' }]
    } as UIElement;
    const onSubmit = jest.fn();
    const onUiSchemaErrors = jest.fn();

    const wrapper = shallow(
      <UIPage
        data={data}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        onUiSchemaErrors={onUiSchemaErrors}
      />
    );

    expect(onUiSchemaErrors).toBeCalledWith(expect.anything());
    expect(wrapper.find(Formik).exists()).toBe(false);
  });

  it('renders a valid form with empty data, schema, and valid uiSchema', () => {
    const data = {};
    const schema = {};
    const uiSchema = {
      component: 'UIText',
      value: 'Example Form'
    } as UIElement;
    const onSubmit = jest.fn();
    const onUiSchemaErrors = jest.fn();

    const wrapper = shallow(
      <UIPage
        data={data}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        onUiSchemaErrors={onUiSchemaErrors}
      />
    );

    expect(onUiSchemaErrors).not.toBeCalledWith(expect.anything());
    expect(wrapper.find(Formik).exists()).toBe(true);
  });
});
