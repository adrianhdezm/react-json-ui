import { UIBasicElementNames, UIContainerElementNames } from './ui-element-registry';

const UIRule = {
  type: 'object',
  properties: {
    effect: { type: 'string', enum: ['HIDE', 'DISABLE'] },
    condition: {
      type: 'object',
      properties: {
        reference: { type: 'string' },
        schema: { type: 'string' }
      }
    }
  }
};

const UIBasicElement = {
  type: 'object',
  properties: {
    component: { type: 'string', enum: UIBasicElementNames },
    rules: { type: 'array', items: UIRule },
    value: { type: 'string' },
    props: { type: 'object' }
  },
  additionalProperties: false,
  required: ['component', 'value']
};

const UIContainerElement = {
  type: 'object',
  properties: {
    component: { type: 'string', enum: UIContainerElementNames },
    rules: { type: 'array', items: UIRule },
    props: { type: 'object' },
    elements: {
      type: 'array',
      items: [
        { $ref: '#/definitions/basicElement' },
        { $ref: '#/definitions/containerElement' },
        { $ref: '#/definitions/controlElement' }
      ]
    }
  },
  additionalProperties: false,
  required: ['component', 'elements']
};

const UIControlElement = {
  type: 'object',
  properties: {
    component: { type: 'string', enum: UIContainerElementNames },
    rules: { type: 'array', items: UIRule },
    props: { type: 'object' },
    reference: { type: 'string' },
    options: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          label: { type: 'string' }
        }
      }
    }
  },
  required: ['component', 'reference'],
  additionalProperties: false
};

export const uiSchemata = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  oneOf: [
    { $ref: '#/definitions/basicElement' },
    { $ref: '#/definitions/containerElement' },
    { $ref: '#/definitions/controlElement' }
  ],
  definitions: {
    basicElement: UIBasicElement,
    containerElement: UIContainerElement,
    controlElement: UIControlElement
  }
};
