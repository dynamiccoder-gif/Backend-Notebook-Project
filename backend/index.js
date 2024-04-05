const connectToMongo = require('./db');

// Call the function asynchronously
connectToMongo()
    .then(() => {
        console.log('Connection established');
        // Proceed with other operations
    })
    .catch(error => {
        console.error(error);
    });
    