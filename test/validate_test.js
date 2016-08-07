const { expect } = require('chai');
const { validate, ValidationError } = require('../src');

describe('validate(schema) middleware', () => {
  describe('basic case', () => {
    const SCHEMA = {
      properties: {
        name: { type: 'string' }
      }
    };
    const middleware = validate(SCHEMA);

    it('must explode with a validation error when data is bad', () => {
      expect(() => middleware({body: { name: ['hack'] }})).to.throw(
        ValidationError, "'name' must be string"
      );
    });

    it('calls the next() function when data is good', () => {
      let nextCalled = false;
      expect(() => middleware({body: {name: 'nikolay'}}, {}, () => nextCalled = true)).not.to.throw(ValidationError);
      expect(nextCalled).to.be.true;
    });
  });
});
