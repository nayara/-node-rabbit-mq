#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const convertToObject = (message) => JSON.parse(message);

const handleEvent = (message) => {
  const obj = convertToObject(message);
  console.log("[x] Received %s %s", obj.name, obj.surname);
};

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if(error1) {
      throw error1;
    }

    const queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log("[X] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      message => handleEvent(message.content),
      { noAck: true }
    ); 
  });
});