function autobind (
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor,
) {
  const original = descriptor.value
  const adjusted: PropertyDescriptor = {
    configurable: true,
    get () {
      const boundFn = original.bind(this)
      return boundFn
    },
  }
  return adjusted
}

export default autobind
