const application = require('./configs/server');

application.listen(5000, () => {
    console.log('Api em execução...');
    const repository = new application.app.repositories.Tasks(application);
    repository.Notification();

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
