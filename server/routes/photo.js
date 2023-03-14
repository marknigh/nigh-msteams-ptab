var express = require('express');
var router = express.Router();
const msal = require('@azure/msal-node');
var fetch = require('node-fetch')

router.post('/', function (req, res) {
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
    
    var oboPromise = new Promise ((resolve, reject) => {
        msalClient.acquireTokenOnBehalfOf({
            authority: `https://login.microsoftonline.com/${tid}`,
            oboAssertion: token,
            scopes: scopes,
            skipCache: false
        })
        .then(result => {
            fetch("https://graph.microsoft.com/v1.0/me/photo/$value",
            {
                method: 'GET',
                headers: {
                "Content-Type": "image/jpeg",
                "authorization": "bearer " + result.accessToken
                },
                encoding: null
            })
            .then((response) => {
                if (response.ok) {
                   return response.buffer()
                } else {
                    throw (`Error ${response.status}: ${response.statusText}`);
                }
            })
            .then((results) => {
                resolve(results)
            })
        })
        .catch(error => {
            reject({ "error": error });
        });
    })
    oboPromise.then((picture) => {
        res.set('Content-Type', 'image/jpg')
        res.status(200).send(picture)
    })

});  

module.exports = router;
