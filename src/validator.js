const Ajv = require('ajv');
const ValidationError = require('./error');

module.exports = class Validator {
  constructor(schema) {
    const ajv = new Ajv({ allErrors: true });
    this.validator = ajv.compile(schema);
    this.schema = schema;
  }

  validate(data) {
    const valid = this.validator(data);

    if (!valid) {
      throw new ValidationError(this.humanReadableErrors());
    }
  }

  humanReadableErrors() {
    return this.validator.errors.map(error => {
      const { dataPath, message, keyword, params: {missingProperty} } = error;
      const path = keyword === 'required' ? dataPath + `.${missingProperty}` : dataPath;
      const text = keyword === 'required' ? 'is required' : message.replace('should', 'must');

      return `'${path.replace(/^\./, '')}' ${text}`;
    }).join(', ');
  }
};
