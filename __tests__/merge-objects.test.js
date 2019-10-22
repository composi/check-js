// @ts-nocheck
import {mergeObjects} from "../src"

test('merge should combine two objects and return a new one with those properties.', function() {
  const obj1 = { name: 'Mary' }
  const obj2 = { job: 'project manager' }
  const person = mergeObjects(obj1, obj2)
  expect(person.name).toBe('Mary')
  expect(person.job).toBe('project manager')
})

test('merge should create a new object where the properties of first object are replaced by those of the later', function() {
  const person1 = { name: 'Joe', job: 'mechanic', age: 26}
  const person2 = { name: 'Joe', job: 'astronaut', age: 45}
  const person3 = mergeObjects(person1, person2)
  expect(person3.name).toBe('Joe')
  expect(person3.job).toBe('astronaut')
  expect(person3.age).toBe(45)
})

test('merge should combine multiple objects into a new one', function () {
  const obj1 = {name: 'Jane'}
  const obj2 = {job: 'lab technician'}
  const obj3 = {age: 28}
  const obj4 = {employer: 'Genentech'}
  const obj5 = mergeObjects(obj1, obj2, obj3, obj4)
  expect(obj5.name).toBe('Jane')
  expect(obj5.job).toBe('lab technician')
  expect(obj5.age).toBe(28)
  expect(obj5.employer).toBe('Genentech')
})

test('should merge a function from one object to another', function() {
  const obj1 = {name: 'Joe', job: 'mechanic'}
  const obj2 = {name: 'Sam', announceName() {alert(`My name is ${this.name}`)}}
  const obj3 = mergeObjects(obj1, obj2)
  expect(obj3.name).toBe('Sam')
  expect(obj3.job).toBe('mechanic')
  expect(obj3).toHaveProperty('announceName')
})

test('should create a deep merge of objects', function() {
  const obj1 = {
    name: {
      first: 'Joe'
    }
  }
  const obj2 = {
    name: {
      first: 'Sam',
      last: 'Smith'
    },
    stats: {
      age: 32,
      height: `5'10"`,
      jobs: [
        {
          position: 'developer',
          employer: 'Google',
          status: 'former'
        },
        {
          position: 'mechanic',
          employer: 'Honda',
          status: 'current'
        }
      ]
    }
  }
  const obj3 = mergeObjects(obj1, obj2)
  expect(obj3.name.first).toBe('Sam')
  expect(obj3.name.last).toBe('Smith')
  expect(obj3).toHaveProperty('stats')
  expect(obj3.stats).toHaveProperty('jobs')
  expect(obj3.stats.jobs[0].employer).toBe('Google')
  expect(obj3.stats.jobs[1].employer).toBe('Honda')
  obj2.stats.jobs[1].status = 'former'
  expect(obj3.stats.jobs[1].status).toBe('current')
})

test('Should copy over clone of Map', function() {
  let john = {name: 'John Doe'},
    lily = {name: 'Lily Bush'},
    peter = {name: 'Peter Drucker'},
    sam = {name: 'Sam Adams'}

  const map1 =  new Map([
    [john, 'admin'],
    [lily, 'editor'],
    [peter, 'subscriber']
  ])
  const map2 = mergeObjects(map1)
  expect(map1.size).toBe(3)
  expect(map2.size).toBe(3)
  map2.set(sam, 'worker')
  expect(map2.has(sam)).toBe(true)
  expect(map1.has(sam)).toBe(false)

})

test('should be able to merge two Maps', function() {
  let john = {name: 'John Doe'},
    lily = {name: 'Lily Bush'},
    peter = {name: 'Peter Drucker'},
    sam = {name: 'Sam Adams'},
    mary = {name: 'Mary Smith'}

  const map1 = new Map([
    [john, 'admin'],
    [lily, 'editor'],
    [peter, 'subscriber']
  ])
  const map2 = new Map([
    [peter, 'subscriber'],
    [sam, 'worker'],
    [mary, 'worker']
  ])
  const map3 = mergeObjects(map1, map2)

  expect(map1.size).toBe(3)
  expect(map2.size).toBe(3)
  expect(map3.size).toBe(5)
  expect(map3.has(john)).toBe(true)
  expect(map3.has(lily)).toBe(true)
  expect(map3.has(sam)).toBe(true)
  expect(map3.has(mary)).toBe(true)
})

test('Should copy over clone of Set', function() {
  const set1 = new Set([1, 2, 3])
  const set2 = mergeObjects(set1)
  expect(set1.size).toBe(3)
  expect(set2.size).toBe(3)
  expect(set1.has(3)).toBe(true)
  expect(set2.has(3)).toBe(true)
  set2.add(4)
  expect(set2.size).toBe(4)
  expect(set2.has(4)).toBe(true)
  expect(set1.has(4)).toBe(false)
  expect(set1.size).toBe(3)
})

test('Should be able to merge two Sets', function() {
  const set1 = new Set([1, 2, 3])
  const set2 = new Set([3, 4, 5])
  const set3 = mergeObjects(set1, set2)
  expect(set1.size).toBe(3)
  expect(set2.size).toBe(3)
  expect(set3.size).toBe(5)
  expect(set3.has(4)).toBe(true)
  expect(set3.has(5)).toBe(true)
})

test("merge should create a clone of object.", function () {
  const obj1 = {name: 'Joe'}
  const obj2 = mergeObjects(obj1)
  expect(obj1 !== obj2).toBe(true)
  expect(obj1.name === obj2.name).toBe(true)
})

test('provding only one object should create a clone of it', function() {
  const obj1 = {
    name: {
      first: 'Joe',
      last: 'Bodoni'
    }
  }

  const obj2 = mergeObjects(obj1)
  expect(obj1 == obj2).toBe(false)
  expect(obj1 === obj2).toBe(false)
  obj1.name.last = 'Anderson'
  expect(obj2.name.last).toBe('Bodoni')
})

test('should be able to merge two arrays of simple values together', function() {
  const arr1 = [1,2,3]
  const arr2 = [4,5,6]
  const arr3 = mergeObjects(arr1, arr2)
  expect(arr3).toEqual([1,2,3,4,5,6])
})

test('should be able to merge two arrays of objects together', function() {
  const arr1 = [{name: 'Joe'}, {name: 'Jane'}]
  const arr2 = [{name: 'Mary'}, {name: 'Sam'}]
  const arr3 = mergeObjects(arr1, arr2)
  expect(arr3).toEqual([{ name: 'Joe' }, { name: 'Jane' }, { name: 'Mary' }, { name: 'Sam' }])
})

test('Merge array of objects should be clone not reference', function() {
  const arr1 = [{ name: 'Joe' }, { name: 'Jane' }]
  const arr2 = [{ name: 'Mary' }, { name: 'Sam' }]
  const arr3 = mergeObjects(arr1, arr2)
  arr1[0].name = 'Joseph'
  arr2[1].name = 'Samuel'
  expect(arr1[0].name).toEqual('Joseph')
  expect(arr3[0].name).toEqual('Joe')
  expect(arr2[1].name).toEqual('Samuel')
  expect(arr3[3].name).toEqual('Sam')
})

test('If only a signle array is provided, it should be cloned', function() {
  const arr1 = [{name: 'Sharon'}, {name: 'Bradley'}]
  const arr2 = mergeObjects(arr1)
  arr1[0].name = 'Shelley'
  expect(arr1[0].name).toEqual('Shelley')
  expect(arr2[0].name).toEqual('Sharon')
})
