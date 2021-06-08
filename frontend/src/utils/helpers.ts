export function clearForm(state: object, setState: Function) {
  if (typeof state === 'object' && typeof setState === 'function') {
    const stateCopy = { ...state }
    for (const prop in stateCopy) {
      switch (typeof stateCopy[prop]) {
        case 'string':
          stateCopy[prop] = ''
          break;
        case 'number':
          stateCopy[prop] = 0
          break;
        case 'boolean':
          stateCopy[prop] = false
          break;

        default:
          stateCopy[prop] = undefined
          break;
      }
      console.log(`${prop}: ${stateCopy[prop]}`);
    }
    setState(stateCopy)
  } else {
    throw Error('"state" has to be "object" and "setState" has to be function from "useState" hook to work correctly')
  }
}