const application = require('./configs/server');

application.listen(5000, () => {
    console.log('Api em execução...');
});
