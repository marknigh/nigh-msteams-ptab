var express = require('express');
var router = express.Router();
const msal = require('@azure/msal-node');
var fetch = require('node-fetch')

router.post('/', function (req, res) {
  console.log('post to getProfileOnBehalfOf', req.body)
    // Creating MSAL client
  const msalClient = new msal.ConfidentialClientApplication({
      auth: {
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET
      }
  });

  var tid = req.body.tid;
  var token = req.body.token;
  var scopes = ["https://graph.microsoft.com/User.Read"];
    
  var oboPromise = new Promise((resolve, reject) => {
    msalClient.acquireTokenOnBehalfOf({
      authority: `https://login.microsoftonline.com/${tid}`,
      oboAssertion: token,
      scopes: scopes,
      skipCache: true
    })
    .then(result => {
      console.log('msalClient->result: ', result)
          fetch("https://graph.microsoft.com/v1.0/me/",
            {
              method: 'GET',
              headers: {
                "accept": "application/json",
                "authorization": "bearer " + result.accessToken
              },
              cache: 'default'
            })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw (`Error ${response.status}: ${response.statusText}`);
              }
            })
            .then((profile) => {
              resolve(profile);
            })
    })
    .catch(error => {
      reject({ "error": error });
    });
  });
  
  oboPromise.then(function (result) {
      console.log('oboPromise.then: ', result)
      res.json(result);
  }, function (err) {
      console.log(err); // Error: "It broke"
      res.json(err);
  });
  
});

module.exports = router;
