'use strict';

const Chance = require('chance');
const chance = new Chance();

// hard code store name, leave rest of random order generator
function generatePayload() {
  return {
    "store": "acme-widgets",
    "orderId": chance.guid(),
    "customer": chance.name(),
    "address": chance.address()
  }
}

function handleDelivered(payload) {
  console.log(`WIDGET_VENDOR: Thank you for delivering order ${payload.orderId} to ${payload.customer}`);
}

module.exports = {
  generatePayload,
  handleDelivered
};
