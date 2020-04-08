import React from 'react';
import { shallow } from 'enzyme';
import { UIPage } from '../src/components/ui-page';
import { UIElement } from '../src/types';

describe('<UIPage />', () => {
  it('renders a form element with empty data, schema, and uiSchema', () => {
    const data = {};
    const schema = {};
    const uiSchema = {} as UIElement;
    const onSubmit = jest.fn();

    const wrapper = shallow(
      <UIPage data={data} schema={schema} uiSchema={uiSchema} onSubmit={onSubmit} />
    );

    expect(wrapper.name()).toBe('Formik');
  });
});
