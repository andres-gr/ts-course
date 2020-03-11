export interface ValidateObj {
  max?: number
  maxLen?: number
  min?: number
  minLen?: number
  required?: boolean
  value: string | number
}

function validate (input: ValidateObj) {
  let isValid = true
  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0
  }
  if (input.minLen != null && input.value.constructor === String) {
    isValid = isValid && (input.value as string).length >= input.minLen
  }
  if (input.maxLen != null && input.value.constructor === String) {
    isValid = isValid && (input.value as string).length <= input.maxLen
  }
  if (input.min != null && input.value.constructor === Number) {
    isValid = isValid && (input.value as number) >= input.min
  }
  if (input.max != null && input.value.constructor === Number) {
    isValid = isValid && (input.value as number) <= input.max
  }
  return isValid
}

export {
  validate,
}
