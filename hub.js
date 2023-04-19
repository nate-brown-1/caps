'use strict';

const eventEmitter = require('./eventPool.js');

const logEvent = (eventName) => (payload) => {
  console.log(`
    EVENT: {
      event: ${eventName},
      time: ${new Date()},
      payload: `,payload
  );
};


eventEmitter.on('pickup', logEvent('pickup'));
eventEmitter.on('in-transit', logEvent('in-transit'));
eventEmitter.on('delivered', logEvent('delivered'));

require('./driver');
require('./vendor');
