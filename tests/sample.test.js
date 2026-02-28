import { describe, it, expect } from 'vitest'

describe('Basic Test', () => {
  it('adds numbers correctly', () => {
    expect(2 + 2).toBe(4)
  })
})


describe('Basic Test', () => {
  it('Subtractions numbers correctly', () => {
    expect(2 - 2).toBe(0)
  })
})

// import { describe, it, expect } from 'vitest'

describe('Snapshot Test', () => {
  it('matches snapshot', () => {
    const data = {
      name: 'Bhavini',
      age: 22
    }

    expect(data).toMatchSnapshot()
    //A snapshot is a saved copy of your component’s UI output. 
    //When you run a snapshot test for the first time, it creates a snapshot file that contains the 
    //rendered output of your component. 
    // This file is stored in a __snapshots__ directory alongside your test file.

    // npx vitest -u for updating snap shot values

  })
})