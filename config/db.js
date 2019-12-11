const mongoose = require('mongoose');
const config = require('config');

// Config module allows us to retrieve the info in /config/default.json
// as global variables (production.json for production builds)
const db = config.get('mongoUri');

// Use mongoose to connect to mongo db (async method in mogoose)
const connectToDb = async () => {
  try {
    await mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );

      console.log("Connected to db!");
  }
  catch (err) {
    console.error (err);
    process.exit(1);
  }
};

module.exports = connectToDb;