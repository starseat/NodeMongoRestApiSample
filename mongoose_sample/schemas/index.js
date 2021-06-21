const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    // mongodb://{ID}:{Password}@{host}:{port}/{db}[?options]
    mongoose.connect('mongodb://jw:jwpwd@localhost:27017/admin', {
        dbName: 'nodejs',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (_error) => {
        if(_error) {
            console.log('[Moongoose] db connection error: ', _error);
        }
        else {
            console.log('[Moongoose] db connection success!');                
        }
    });
};

mongoose.connection.on('error', (_error) => {
    console.log('[Moongoose] db connection error (2): ', _error);
});

mongoose.connection.on('disconnected', () => {
    console.log('[Moongoose] db connection refused...');
    console.log('[Moongoose] db retry connect.');
    connect();
});

module.exports = connect;
    
