'use strict';

const { handleDelivered, generatePayload } = require('./vendor-handler.js');

describe('test vendor functions', () => {

  test('can generate payload', () => {
    let testPayload = generatePayload();
    console.log(testPayload);
    expect(typeof(testPayload)).toEqual('object');
  });

  test('can say thanks after order delivered', () => {
    let payload = {};
    console.log = jest.fn();
    handleDelivered(payload);
    expect(console.log).toHaveBeenCalled();
  });

});
