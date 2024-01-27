const express = require('express');
const router = express.Router();
const request = require('request');
const authorizeUrl = 'https://accounts.spotify.com/authorize?';
const client_id = "dc1756d67fd14f4eb588e17b89569071";
const client_secret = "1c33b2074ab645c986228e5a345fd8ff";
const scope = "user-read-currently-playing";
const redirect_uri = "http://192.168.1.19:3000/callback";
const tokenUrl = 'https://accounts.spotify.com/api/token';
const querystring = require('querystring');
let stateKey = 'spotify_auth_state';

const generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};



router.get('/', function (req, res, next) {
  res.send('This is the about page.');
})

router.get('/login', function (req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  res.redirect(authorizeUrl +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      cient_secret: client_secret,
      scope: scope,
      redirect_uri: redirect_uri,
      state: stateKey
    }));
});

router.get('/callback', async function (req, res, next) {

  let code = req.query.code || null;
  let state = req.query.state || null;

  if (state == null) {
    //res.json({ error: 'state_mismatch'})
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: tokenUrl,
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
  }

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {

      let access_token = body.access_token, refresh_token = body.refresh_token, expires_in = body.expires_in;

      let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      request.get(options, function (error, response, body) {
        res.redirect('/getToken?' +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token,
          expires_in: expires_in,
          body: JSON.stringify(body),
          error: error, 
          response: response
        }));
      });

      // use the access token to access the Spotify Web API
      // we can also pass the token to the browser to make requests from there


    } else {
      res.redirect('/refresh_token' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
});


router.get('/getToken', (req, res) => {
  const access_token = req.query.access_token, refresh_token = req.query.refresh_token, expires_in = req.query.expires_in, user_data = req.query.body, response = req.query.response, error = req.query.error;
  
  res.json({ access_token: access_token, refresh_token: refresh_token, expires_in: expires_in, userData: JSON.parse(user_data), response: response, error: error})
})

router.get('/getCurrentlyPlaying', (req, res) => {
  const access_token = req.query.access_token
  const refresh_token = req.query.refresh_token;
  const trackEndpoint = "https://api.spotify.com/v1/me/player/currently-playing?market=FR";
  const options = {
    url: trackEndpoint,
    headers: {
      'Authorization': 'Bearer ' + access_token,
    },
    json: true,
  };

  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.json({ status:response.statusCode, song: body, access_token: access_token, refresh_token: refresh_token })
    } else {
      res.json({ error: error, status: response.statusCode, body: body});
    }
  });
})

router.get('/refresh_token', function (req, res) {
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token,
        refresh_token = body.refresh_token;
      res.json({
        'access_token': access_token,
        'refresh_token': refresh_token
      });
    }
  });
});


module.exports = router;
