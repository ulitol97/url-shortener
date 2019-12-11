// POST route toinsert long url in db
const express = require('express');
const router = express.Router();

const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');

// Require url schema model
const Url = require('../model/url');

//@route POST /api/url/shorten  <= endpoint
//@desc Create shortened version of url
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  // Invalid base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Invalid user submitted url
  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json('Invalid submitted url');
  }

  // Valid user submitted url
  try {
    // Fetch db in case the submitted URL is shortened already
    let url = await Url.findOne({ longUrl});

    // Long url already in db
    if (url) {
      res.json(url); // 202 and return url in db
    }
    // Long url not in db, create, assign a code and insert
    else {
      let urlCode = shortId.generate();
      const shortUrl = baseUrl + '/' + urlCode;
      // Nre Url model object
      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date()
      });
      
      // Insert Url model object into db
      await url.save();
      // Repsonse 202 and Url inserted object data
      res.json(url);
    }
  }
  catch (err){
    console.error(err);
    return res.status(500).json('Server error');
  }
});

module.exports = router;