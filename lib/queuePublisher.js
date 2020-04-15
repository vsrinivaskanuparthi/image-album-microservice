var amqp = require('amqplib/callback_api');
var os = require('os');





module.exports.publishMessage = (message_data) => {
    return new Promise((resolve, reject) => {
        var messageEnv = {
            queue: 'image-album',
            created: Date.now(),
            host: os.hostname(),
            data: message_data.data
        };


        amqp.connect(process.env.MQ_URL, function (err, conn) {
            if (err) {
                reject(err)
            } else {
                conn.createChannel(function (err, ch) {
                    if (err) {
                        reject(err)
                    } else {
                        ch.assertQueue(messageEnv.queue, {
                            durable: true
                        });
                        var msg = JSON.stringify(messageEnv);
                        let response = ch.sendToQueue(messageEnv.queue, Buffer.from(msg));
                        resolve(response)
                    }
                }).on('error', (err) => {
                    reject({ status: 400, message: err.message || 'queue is not available' })
                });
            }
        });
    })
}


