import {
  UIBasicElementNames,
  UIContainerElementNames,
  UIControlElementNames
} from './ui-element-registry';

export const uiSchemata = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $ref: '#/definitions/uiElement',
  definitions: {
    uiElement: {
      type: 'object',
      oneOf: [
        { $ref: '#/definitions/basicElement' },
        { $ref: '#/definitions/containerElement' },
        { $ref: '#/definitions/controlElement' }
      ]
    },
    uiRule: {
      type: 'object',
      properties: {
        effect: { type: 'string', enum: ['HIDE', 'DISABLE'] },
        condition: {
          type: 'object',
          properties: {
            reference: { type: 'string' },
            schema: { type: 'object' }
          }
        }
      }
    },
    containerElement: {
      type: 'object',
      properties: {
        component: { type: 'string', enum: UIContainerElementNames },
        rules: { type: 'array', items: { $ref: '#/definitions/uiRule' } },
        props: { type: 'object' },
        elements: {
          type: 'array',
          items: {
            $ref: '#/definitions/uiElement'
          }
        }
      },
      additionalProperties: false,
      required: ['component', 'elements']
    },
    controlElement: {
      type: 'object',
      properties: {
        component: { type: 'string', enum: UIControlElementNames },
        rules: { type: 'array', items: { $ref: '#/definitions/uiRule' } },
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
    },
    basicElement: {
      type: 'object',
      properties: {
        component: { type: 'string', enum: UIBasicElementNames },
        rules: { type: 'array', items: { $ref: '#/definitions/uiRule' } },
        value: { type: 'string' },
        props: { type: 'object' }
      },
      additionalProperties: false,
      required: ['component', 'value']
    }
  }
};
