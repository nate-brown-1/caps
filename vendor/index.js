'use strict';

const eventEmitter = require('../eventPool.js');
const { generatePayload, handleDelivered } = require('./handler.js');

eventEmitter.on('delivered', handleDelivered);

eventEmitter.emit('pickup', generatePayload());