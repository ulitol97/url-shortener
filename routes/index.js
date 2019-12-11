const express = require('express');
const router = express.Router();

// Require url schema model
const Url = require('../model/url');

//@route GET /:code <= endpoint
//@desc Retrieve the original url from the shortened one 
// and redirect to it
// : represent a URL a param
router.get('/:code', async (req, res) => {
  try {
    // Fecth db for the code
    url = await Url.findOne({urlCode: req.params.code});
    // Short url found, redirect
    if (url){
      return res.redirect(url.longUrl);
    }
    // Short url nor found, raise error
    else {
      return res.status(404).json('No url found');
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).json('Server error');
  }
  
});

module.exports = router;