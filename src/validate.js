const Validator = require('./validator');

/**
 * Creates an express middleware that validates incomming request bodies based on provided schema
 *
 * @param {Object} JSON schema
 * @return {Function} middleware
 */
module.exports = function validate(schema) {
  const validator = new Validator(schema);

  return (req, res, next) => {
    validator.validate(req.body);
    next();
  };
};
