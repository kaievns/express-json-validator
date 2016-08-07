const Validator = require('./validator');

/**
 * Creates an express middleware that validates incomming request bodies based on provided schema
 *
 * @param {Object} JSON schema
 * @return {Function} middleware
 */
module.exports = function validate(schema, options = {}) {
  const {envelope} = options;
  const validator = new Validator(
    !envelope ? schema : {
      properties: {
        [envelope] : Object.assign({ type: 'object' }, schema)
      },
      required: [ envelope ]
    }
  );

  return (req, res, next) => {
    validator.validate(req.body || {});
    next();
  };
};
