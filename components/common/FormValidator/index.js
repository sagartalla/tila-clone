export default class FormValidator {
  constructor(validations) {
    this.validations = validations;
    this.onBlurValidation = {};
  }
  validate(state) {
    const validation = this.valid();
    this.validations.forEach((rule) => {
      if (!validation[rule.field].isInValid) {
        const field_value = state[rule.field];
        const args = rule.args || [];
        const validationMethod = rule.method;

        if (validationMethod(field_value, state, args) !== rule.validWhen) {
          validation[rule.field] = { isInValid: true, message: rule.message };
          validation.isValid = false;
        }
      }
    });
    return validation;
  }

  valid() {
    const validation = {};

    this.validations.forEach((rule) => {
      validation[rule.field] = {
        isInValid: false, message: '',
      };
    });

    return { isValid: true, ...validation };
  }

  validateOnBlur(state) {
    const key = Object.keys(state)[0];
    const validationObj = this.validate(state);
    this.onBlurValidation[key] = validationObj[key];

    return { isValid: validationObj.isValid, ...this.onBlurValidation };
  }
}
