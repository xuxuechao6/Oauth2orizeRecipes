const express = require('express');
const router = express.Router();

const oauth2         = require('../middle/oauth2');
const client         = require('../middle/client');
const site           = require('../middle/site');
const token          = require('../middle/token');
const user           = require('../middle/user');
// Passport configuration
require('../middle/auth');

router.get('/', function(req, res, next) {
  if (!req.query.code) {
    res.render('index');
  } else {
    res.render('index-with-code');
  }
});



router.get('/',        site.index);
router.get('/login',   site.loginForm);
router.post('/login',  site.login);
router.get('/logout',  site.logout);
router.get('/account', site.account);

router.get('/dialog/authorize',           oauth2.authorization);
router.post('/dialog/authorize/decision', oauth2.decision);
router.post('/oauth/token',               oauth2.token);

router.get('/api/userinfo',   user.info);
router.get('/api/clientinfo', client.info);

// Mimicking google's token info endpoint from
// https://developers.google.com/accounts/docs/OAuth2UserAgent#validatetoken
router.get('/api/tokeninfo', token.info);

// Mimicking google's token revoke endpoint from
// https://developers.google.com/identity/protocols/OAuth2WebServer
router.get('/api/revoke', token.revoke);
module.exports = router;
