var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')

/* GET weather for given city */
router.get('/:city', (req, res, next) => {
    const url = ('https://api.openweathermap.org/data/2.5/weather?' + new URLSearchParams({
      'q': req.params.city,
      'appid': process.env.WEATHER_KEY,
      'units': 'imperial'
      }))
      
    fetch(url).then(res => res.json())
    .then((results) => {
        console.log(results)
        res.status(200).send(results)
    })
});

module.exports = router;
