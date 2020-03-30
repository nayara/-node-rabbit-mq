#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c588ba8... temp
const convertToObject = (message) => JSON.parse(message);

const handleEvent = (message) => {
  const obj = convertToObject(message);
  console.log("[x] Received %s %s", obj.name, obj.surname);
};

<<<<<<< HEAD
=======
>>>>>>> Creates a simple sender and receiver
=======
>>>>>>> c588ba8... temp
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
<<<<<<< HEAD
<<<<<<< HEAD
      message => handleEvent(message.content),
=======
      message => console.log("[x] Received %s", message.content.toString()),
>>>>>>> Creates a simple sender and receiver
=======
      message => handleEvent(message.content),
>>>>>>> c588ba8... temp
      { noAck: true }
    ); 
  });
});