#! /usv/bin/env node

const amqp = require('amqplib/callback_api');

const args = process.argv.slice(2);

if(args.length == 0){
  console.log(" Usage: receive_logs_direct.js [info] [warning] [error]");
  process.exit(1);
}

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const exchange = 'direct-logs';

    channel.assertExchange(exchange, 'direct', {
      durable: false
    });

    channel.assertQueue('', {
      exclisive: true
    }, (error2, q) => {
      if (error2) {
        throw error2;
      }

      console.log(' [X] Waiting for logs. To exit press CTRL+C');

      args.forEach((severity) => {
        channel.bindQueue(q.queue, exchange, severity);
      });

      channel.consume(q.queue, (message) => {
        console.log(" [X] %s %s", message.fields.routingKey, message.content.toString());
      }, { noAck: true }
      );
    });
  });
});