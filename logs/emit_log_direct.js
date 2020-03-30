#! /usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  };

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    };

    const exchange = 'direct-logs';
    const args = process.argv.slice(2);
    const message = args.slice(1).join(' ') || 'Hello World!';
    const severity = (args.length > 0) ? args[0] : 'info';

    channel.assertExchange(exchange, 'direct', {
      durable: false
    })

    channel.publish(exchange, severity, Buffer.from(message));

    console.log(" [X] Sent %s: '%s'", severity, message);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500)
});