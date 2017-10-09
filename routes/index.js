const express = require('express');
const CoreService = require('../lib/CoreService');

const router = express.Router();

/* test results for errors

in both cases errors are caught by express framework and don't crash the server.

however:
 - async error (above) never returns anything to browser! 
   (connection seems to stay open, very bad!)
 - sync error (below) returns a 500 page with error stack trace (good!)
*/
router.get('/async', function(req, res, next) {
  CoreService.heavyLifting().then( () => {
    res.render('index', { title: 'Express' });
  });
});

router.get('/sync', function(req, res, next) {
  const test = misspelledVariable;
  res.render('index', { title: 'Express' });
});

/* test results for catching

rethrowing an error has absolutely no effect and is wasted code!

exceptions and expecially rejected promises from services have to be caugth in 
the controller, because this is the right place to forward them to the error handler
by calling next() with the error object!
*/

router.get('/badcatch', function(req, res, next) {
  CoreService.heavyLifting().then( () => {
    res.render('index', { title: 'Express' });
  }).catch((err) => {
    throw err;
  })
});

router.get('/goodcatch', function(req, res, next) {
  CoreService.heavyLifting().then( () => {
    res.render('index', { title: 'Express' });
  }).catch((err) => {
    next(err);
  })
});

module.exports = router;
