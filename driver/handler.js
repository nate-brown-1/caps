'use strict';

const eventEmitter = require('../eventPool');

function handlePickup(payload) {
  console.log(`DRIVER: picked up order ${payload.orderId}`);

  eventEmitter.emit('in-transit', payload);

  console.log(`DRIVER: delivered order ${payload.orderId}`);

  eventEmitter.emit('delivered', payload);
}

module.exports = handlePickup;
