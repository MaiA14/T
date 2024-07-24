# Queue API
You are required to implement a running backend server, exposing a REST API for managing queues of messages.
The REST API:

<b> POST /api/{queue_name} </b> <br>
The body is the message in JSON format. 
This will place a new message in the queue named queue_name.


<b> GET /api/{queue_name}?timeout={ms} </b> <br>
Gets the next message from queue_name.
Will return 204 if there’s no message in the queue after the timeout has elapsed.
If a timeout is not specified, a default of 10 seconds should be used.

BONUS: Support running multiple servers on multiple machines, acting as a single logical queue.

## Installation

```bash
$ npm install
```

## Running the server

```bash
$ npm run start
```

## Bonus
I would implment a server that is connected to RabbitMQ

