const { expect } = require('chai');
const { Validator, ValidationError } = require('../src');

describe('Validator', () => {
  describe('basic useage', () => {
    const SCHEMA = {
      properties: {
        name: { type: 'string', maxLength: 8 },
        info: {
          type: 'object',
          properties: {
            age: { type: 'integer', maximum: 100 },
            name: {
              type: 'object',
              properties: {
                first: { type: 'string' },
                last: { type: 'string' }
              },
              required: [ 'first', 'last' ]
            }
          },
          required: [ 'age' ]
        }
      },
      required: [ 'name' ]
    };
    const BAD_DATA = { name: 'Super Nikolay', info: { age: 666, name: { last: false } } };
    const GOOD_DATA = { name: 'Nikolay' };

    const validator = new Validator(SCHEMA);

    it('fails when called with invalid data', () => {
      expect(() => validator.validate(BAD_DATA)).to.throw(
        ValidationError,
        "'name' must NOT be longer than 8 characters, "+
        "'info.age' must be <= 100, "+
        "'info.name.first' is required, "+
        "'info.name.last' must be string"
      );
    });

    it('passes when called with good data', () => {
      expect(() => validator.validate(GOOD_DATA)).not.to.throw();
    });
  });
});
