const express = require('express');
const connectDb = require('./config/db');

// Init app
const app = express();

// Connect to db
connectDb();

// Allow API to accept JSON data
app.use(express.json({extended: false}));

// Define app routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


const PORT = 5000;

app.listen(PORT, () => console.log('Server running on port ' + PORT));
