'use strict';

const handlePickup = require('./handler.js');

describe('test driver functions', () => {

  test('can report order picked up', () => {
    let payload = {};
    console.log = jest.fn();
    handlePickup(payload);
    expect(console.log).toHaveBeenCalled();
  });

});
