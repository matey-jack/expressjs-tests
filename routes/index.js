const express = require('express');
const CoreService = require('../lib/CoreService');

const router = express.Router();

/* test results: in both cases errors are caught by express framework, however:
 - async error (above) never returns anything to browser! 
   (connection seems to stay open, very bad!)
 - sync error (below) returns a 500 page with error stack trace (good!)
*/
router.get('/', function(req, res, next) {
  CoreService.heavyLifting().then( () => {
    res.render('index', { title: 'Express' });
  })
});

router.get('/test', function(req, res, next) {
  const test = misspelledVariable;
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  CoreService.heavyLifting().then( () => {
    res.render('index', { title: 'Express' });
  })
});


module.exports = router;
