// Model of our URLs for mongoose
const mongoose = require('mongoose');

// Schema of our url objects in db
const urlSchema = new mongoose.Schema({
  urlCode: String, // Unique code of each url when shortened
  longUrl: String, // Original url
  shortUrl: String, // Shortened url including the code
  date: {type: Date, default:Date.now}
});

// Export schema
module.exports = mongoose.model ('Url', urlSchema);