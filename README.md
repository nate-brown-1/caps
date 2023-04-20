# CAPS: Code Academy Parcel Service

## CAPS Phase 3

## Whiteboard

Create a UML diagram of the CAPS system on a whiteboard before you start.

![CAPS Whiteboard: Phase 3](./img/event-emitter-whiteboard.png)

## Business Requirements

Refer to the CAPS System Overview for a complete review of the application, including Business and Technical requirements along with the development roadmap.

### Phase 3 Requirements

In Phase 3, we are building a set of features to help manage deliveries made by CAPS Drivers. This will simulate a delivery driver receiving a list of orders from a Queue and “scanning” package codes on delivery. Retailers will be able to see in their dashboard or log, a list of all packages delivered in real time. Should a delivery driver deliver any packages while the retailer is not connected to the dashboard, the vendor client should be guaranteed to receive “delivery” notifications from the Queue system.

Our Server is going to have the same overall functionality, but we want to incorporate a few improvements to existing features:
We want a feature to keep a log of payloads that reach our system, organized by vendor and event type.
Payloads are “published” to the appropriate Clients for the appropriate events.
Client Vendor Applications used by retailers, should subscribe to appropriate Vendor Queues so that they can be alerted when a delivery was made.
The Client can ask for all undelivered messages from a particular Server Queue.
When a Client receives a message, it will need to let the hub server know that it was received.

### User Stories

As a vendor, I want to “subscribe” to “delivered” notifications so that I know when my packages are delivered.
As a vendor, I want to “catch up” on any “delivered” notifications that I might have missed so that I can see a complete log.
As a driver, I want to “subscribe” to “pickup” notifications so that I know what packages to deliver.
As a driver, I want to “catch up” on any “pickup” notifications I may have missed so that I can deliver everything.
As a driver, I want a way to “scan” a delivery so that the vendors know when a package has been delivered.
And as developers, here are some of the development stories that are newly relevant to the above.


As a developer, I want to create a system of tracking who is subscribing to each event.
As a developer, I want to place all inbound messages into a “queue” so that my application knows what events are to be delivered.
As a developer, I want to create a system for communicating when events have been delivered and received by subscribers.
As a developer, I want to delete messages from the queue after they’ve been received by a subscriber, so that I don’t re-send them.
As a developer, I want to create a system for allowing subscribers to retrieve all undelivered messages in their queue.
Technical Requirements / Notes
Overview
We are adding a new module to the CAPS Application Server to guarantee that payloads from events are delivered to any Client Module that is listening for specific events. This lab will refactor the Server and Client Modules to persist payloads on the Server side and remove them once received by clients.

## Technical Requirements / Notes

### Overview

The goal of this lab is to create a namespaced Socket.io event server, and to configure Vendor and Driver Client Modules.

- The Socket Server will create a namespace of caps that will receive all CAPS event traffic.
- Each Vendor and Driver Client will connect to the caps namespace.
- The server will emit specific events to each socket that is listening for their designated events from the Global Event Pool defined in the Server.
- Each Vendor will only emit and listen for specific events based on their Vendor ID. This will be managed by rooms within Socket.io.
- Each Driver will “pick up” a package when the vendor notifies the Server that an “order” is ready and simulate “in-transit” and “delivered” events.
- The expected output of the 3 running applications is the same as it was in Phase 2.

### Proposed File Structure

├── .github
│   ├── workflows
│   │   └── node.yml
├── clients
│   ├── driver
│   │   ├── handler.js
│   │   ├── index.js
│   │   └── driver-handler.test.js
│   ├── flower-vendor
│   │   ├── handler.js
│   │   ├── index.js
│   │   └── flower-handler.test.js
│   ├── lib
│   │   ├── client.js (optional)
│   │   └── client.test.js (optional)
│   ├── widget-vendor
│   │   ├── handler.js
│   │   ├── index.js
│   │   └── widget-handler.test.js
│   └── socket.js (socket instance useful for mocks/testing)
├── server
│   ├── lib
│   │   ├── queue.js
│   │   └── queue.test.js
│   └── index.js
├── .eslintrc.json
├── .gitignore
├── package.json
└── README.md

### Create the CAPS system as follows

#### Global Event Pool (HUB)

Use the socket.io npm package to configure an event Server that can be started at a designated port using node.
We still need the Server to configure socket connections to the caps namespace on a specified PORT.
Create a Message Queue that can store payloads for specific Clients.
Each payload that is read by the pickup event should be added to a Queue for Driver clients.
Each payload that is read by the delivered event should be added to a Queue for Vendor clients.
This could be as simple as an Object or Array, or as complex as a Module that connects to and performs operations against a database.
Add a received event to the Global Event Pool.
When this event is heard on the server, assume it’s a Client Module telling you a payload was successfully read.
The payload should include the client id, event name, and message id, so that you can delete it from the Queue.
Add a getAll event to the Global Event Pool.
The payload should include the client id and event name.
When this event is heard on the server, find each of the messages in the queue for the client, for the event specified.
Go through each of the entries for the client/event in the queue (if any) and broadcast them to the client.
Refactor the delivered, pickup, and in-transit events in the Global Event Pool.
We need to be able to add payloads to the appropriate Queue for specific Clients.
When these events are triggered, add the payload immediately to the appropriate Queue.
Broadcast the same event, with the following payload to all subscribers.
Note: The payload event value should correspond to either pickup or delivered; whichever is being emitted from the corresponding vendor or driver client(s).

#### Vendor Client Application

Create 2 separate “stores” that use the Vendor Client module.
Create one store called acme-widgets and 1-800-flowers.
Connect to the CAPS Application Server using the caps namespace.
Both stores should “subscribe” to different Queues, since they are separate stores.
On startup, your client applications should trigger a getAll event that fetches all messages from the server that are in that Vendor’s Queue (events/messages they’ve not yet received).
Trigger the received event with the correct payload to the server.
Subscribe to the delivered Queue.
Each client should be able to receive payloads “published” to the delivered Queue.
We still want to log a confirmation with the “order-id” and payload.

#### Driver Client Application

Refactor event logic to use Queues.
Make sure your Driver Client is subscribing to the appropriate Vendor Queues.
Upon connection, Driver Client can fetch any messages added to their subscribed Queues.

When running, the vendor and driver consoles should show their own logs. Additionally, the CAPS server should be logging everything.

### Visual Validation

Start all 3 servers.
Queue Server.
All Client Application Servers.
Stop one of your applications servers.
Re-send some requests to your queue.
This should leave some undelivered messages.
Re-start the application server.
It should do an immediate request of all queued messages and log them normally.

### Testing

- Write unit tests for each event handler function (not event triggers themselves).
- Use jest spies and/or mock functionality to assert that your handlers were called and ran as expected.
- For our use case, was console.log() and .emit() called with the expected arguments?
- Write unit tests for the queue module.
