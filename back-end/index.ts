const application = require('./configs/server');

// funcionou - adaptar

application.listen(5000, async () => {
    application.hostServer.init(application);
    console.log('Api em execução...');

    // setTimeout(() => {
    //     console.log('oi');
    // }, 1000);

    //Date.parse(nexNotification[0].prazo)

    // application.notifier.notify(
    //     {
    //         title: 'My awesome title',
    //         message: 'Hello from node, Mr. User!',
    //         //icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
    //         sound: true, // Only Notification Center or Windows Toasters
    //         wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
    //     },
    //     function (err, response, metadata) {
    //         // Response is response from notification
    //         // Metadata contains activationType, activationAt, deliveredAt
    //     }
    // );
});
