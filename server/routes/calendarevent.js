var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')

router.get('/', function (req, res) {

    var tid = req.body.tid;
    var token = req.body.token;
    var scopes = ["https://graph.microsoft.com/Calendars.Read"];
    
    var oboPromise = new Promise ((resolve, reject) => {
        req.app.locals.msalClient.acquireTokenOnBehalfOf({
            authority: `https://login.microsoftonline.com/${tid}`,
            oboAssertion: token,
            scopes: scopes,
            skipCache: false
        })
        .then(result => {
            fetch("https://graph.microsoft.com/v1.0/me/calendar/events",
            {
                method: 'GET',
                headers: {
                "Prefer: outlook.timezone": "CDT",
                "authorization": "bearer " + result.accessToken
                },
                encoding: null
            })
            .then((response) => {
                if (response.ok) {
                   return response.json()
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
    oboPromise.then((calendar_event) => {
        res.status(200).send(calendar_event)
    })

});  

module.exports = router;
