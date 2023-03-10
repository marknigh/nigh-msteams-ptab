var express = require('express');
var router = express.Router();

router.post('/getProfileOnBehalfOf', function (req, res) {
    var tid = req.body.tid;
    var token = req.body.token;
    var scopes = ["https://graph.microsoft.com/User.Read"];
    
    var oboPromise = new Promise((resolve, reject) => {
      msalClient.acquireTokenOnBehalfOf({
        authority: `https://login.microsoftonline.com/${tid}`,
        oboAssertion: token,
        scopes: scopes,
        skipCache: false
      }).then(result => {
            fetch("https://graph.microsoft.com/v1.0/me/",
              {
                method: 'GET',
                headers: {
                  "accept": "application/json",
                  "authorization": "bearer " + result.accessToken
                },
                mode: 'cors',
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
      }).catch(error => {
        reject({ "error": error.errorCode });
      });
    });
  
    oboPromise.then(function (result) {
      res.json(result);
    }, function (err) {
      console.log(err); // Error: "It broke"
      res.json(err);
    });
  
  });

module.exports = router;
