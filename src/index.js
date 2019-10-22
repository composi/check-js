/**
 * Combine two objects, merging the second into the first. Any properties already existing in the first will be replaced by those of the second. Any properties in the second not in the first will be added to it.
 * This does a deep clone. Sub arrays will be cloned. If arrays consist of objects, those will be cloned. Functions will also be cloned. This also support Maps and Sets.
 * Passing in just one object will return a deep clone of it.
 *
 * @param {Object.<string, any>[]} objects One or more objects to use for merging.
 * @return {Object.<string, any>} Object.<string, any>
 */

export function mergeObjects(...objects) {
  const FIRST_ARGUMENT = 0
  // Add empty array or object to arguments to ensure unique clone:
  if (Array.isArray(objects[FIRST_ARGUMENT])) {
    objects.unshift([])
  } else if (objects[FIRST_ARGUMENT] instanceof Set) {
    objects.unshift(new Set())
  } else if (objects[FIRST_ARGUMENT] instanceof Map) {
    objects.unshift(new Map())
  } else {
    objects.unshift({})
  }

  /**
   * Create a clone of an object or array.
   * @param {*} object The object to clone.
   * @return {Object<string, any>} Object<string, any>
   */

  function createClone(object, hash = new WeakMap()) {
    // Deal with primitive types:
    if (Object(object) !== object) return object
    // Deal with cyclic references:
    if (hash.has(object)) return hash.get(object)
    const result =
      object instanceof Date
        ? new Date(object)
        : object instanceof RegExp
        ? new RegExp(object.source, object.flags)
        : object instanceof Set
        ? new Set([...object])
        : object instanceof Map
        ? new Map([...object])
        : object.constructor
        ? new object.constructor()
        : Object.create(null)
    hash.set(object, result)
    if (object instanceof Set) {
      return new Set([...object])
    } else if (object instanceof Map) {
      return new Map([...object])
    } else {
      return Object.assign(
        result,
        ...Object.keys(object).map(key => ({
          [key]: createClone(object[key], hash)
        }))
      )
    }
  }
  // Return cloned copy of merged objects:
  if (Array.isArray(objects[FIRST_ARGUMENT])) {
    return objects.reduce((a, b) => Array.prototype.concat(a, createClone(b)))
  } else if (objects[FIRST_ARGUMENT] instanceof Set) {
    // @ts-ignore
    return objects.reduce((a, b) => new Set([...a, ...createClone(b)]))
  } else if (objects[FIRST_ARGUMENT] instanceof Map) {
    // @ts-ignore
    return objects.reduce((a, b) => new Map([...a, ...createClone(b)]))
  } else if (typeof objects[FIRST_ARGUMENT] === 'object') {
    return objects.reduce((a, b) => Object.assign(a, createClone(b)))
  }
}

export const cloneObject = object => mergeObjects(object)
export const clone = object => mergeObjects(object)
