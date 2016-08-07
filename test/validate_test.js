const { expect } = require('chai');
const { validate, ValidationError } = require('../src');

describe('validate(schema) middleware', () => {
  const SCHEMA = {
    properties: {
      name: { type: 'string' }
    }
  };

  describe('basic case', () => {
    const middleware = validate(SCHEMA);

    it('must explode with a validation error when data is bad', () => {
      expect(() => middleware({body: { name: ['hack'] }})).to.throw(
        ValidationError, "'name' must be string"
      );
    });

    it('calls the next() function when data is good', () => {
      let nextCalled = false;
      expect(() => middleware({body: {name: 'nikolay'}}, {}, () => nextCalled = true)).not.to.throw();
      expect(nextCalled).to.be.true;
    });
  });

  describe('with the `envelope` option', () => {
    const middleware = validate(SCHEMA, { envelope: 'user' });

    it('correctly explodes on missing envelope', () => {
      expect(() => middleware({body: null})).to.throw(
        ValidationError, "'user' is required"
      );
    });

    it('correctly validates data on the inside of the envelope', () => {
      expect(() => middleware({body: {user: {name: 123}}})).to.throw(
        ValidationError, "'user.name' must be string"
      );
    });

    it('calls the next middleware when everything is good', () => {
      let nextCalled = false;
      expect(() => middleware({body:{user:{name: 'nikolay'}}}, {}, () => nextCalled = true)).not.to.throw();
      expect(nextCalled).to.be.true;
    });
  });
});
