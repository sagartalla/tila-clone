export default class FormValidator {
  constructor(validations) {
    this.validations = validations
  }
  validate(state) {
    let validation = this.valid()
    this.validations.forEach((rule,i) => {
      if(!validation[rule.field].isInvalid) {
        let field_value = state[rule.field]
        let args = rule.args || []
        let validationMethod = rule.method

        if(validationMethod(field_value,state,...args) !== rule.validWhen) {
          validation[rule.field] = {isInValid:true, message:rule.message}
          validation.isValid = false
        }
      }
    })
    return validation
  }

  valid() {
    let validation = {}

    this.validations.map((rule) => (
      validation[rule.field] = {
        isInValid:false, message:''
      }
    ))

     return { isValid:true, ...validation }
  }
}
