#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = 'task_queue';

    channel.assertQueue(queue, {
      durable: true
    });

    channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    
    channel.consume(queue, 
      (message) => {
      var secs = message.content.toString().split('.').length - 1;

      console.log(" [x] Received %s", message.content.toString());
      
      setTimeout(() => {
        console.log(" [x] Done");
        channel.ack(message);
      }, secs * 1000);
    }, {
      noAck: false
    });
  });
});