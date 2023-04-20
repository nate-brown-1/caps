'use strict';

const { reportInTransit, reportDelivered } = require('./driver-handler.js');

describe('test driver functions', () => {

  test('can report order in transit', () => {
    let payload = {};
    console.log = jest.fn();
    reportInTransit(payload);
    expect(console.log).toHaveBeenCalled();
  });


  test('can report order delivered', () => {
    let payload = {};
    console.log = jest.fn();
    reportDelivered(payload);
    expect(console.log).toHaveBeenCalled();
  });

});
