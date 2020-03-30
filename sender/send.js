#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

const convertToMessage = (object) => JSON.stringify(object);

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if(error1) {
      throw error1;
    }

    const queue = 'hello';
    const message = convertToMessage({
      name: 'Foo',
      surname: 'Lano'
    });

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(" [X] Sent %s", message);
  });

  setTimeout(
    () => {
      connection.close();
      process.exit(0) 
    }, 500);
});