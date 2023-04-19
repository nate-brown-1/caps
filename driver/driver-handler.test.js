'use strict';

const handlePickup = require('./handler.js');

describe('test driver functions', () => {

  test('can report order picked up', () => {
    let payload = {};
    console.log = jest.fn();
    handlePickup(payload);
    // handle pickup should trigger 2 console logs : in-transit and delivered
    expect(console.log).toHaveBeenCalledTimes(2);
  });

});
