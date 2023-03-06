// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const msal = require('@azure/msal-node');

// Creating MSAL client
const msalClient = new msal.ConfidentialClientApplication({
  auth: {
    clientId: '5b8d440a-1f75-4c7e-901d-a9c6c80a6e5d',
    clientSecret: 'SlP8Q~MbWdLPJcb1Dd89b7uL_0~vaM-lNh5rIbQK'
  }
});
// import node-fetch
const fetch = require('node-fetch')
// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

app.post('/getProfileOnBehalfOf', function (req, res) {
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

// Get Weather
app.get('/weather/:city', (req, res) => {
  var apikey = '2f01d48058351be6fead9722d7a256dd'
  const url = ('https://api.openweathermap.org/data/2.5/weather?' + new URLSearchParams({
    'q': req.params.city,
    'appid': apikey,
    'units': 'imperial'
    }))
    // console.log('url: ', url)
    
    fetch(url).then(res => res.json())
      .then((results) => {
        console.log(results)
        res.status(200).send(results)
      })
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});