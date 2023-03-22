var express = require('express');
var router = express.Router();
var getProfileName = require('../profileNameService');
var getOboAccessToken = require('../oboService');

router.post('/', async (req, res) => {

  const INTERACTION_REQUIRED_STATUS_TEXT = "interaction_required";
  const tenantId = req.body.tid;
  const clientSideToken = req.body.token;

  
  try{
      const serverSideToken = await getOboAccessToken(tenantId, clientSideToken, req)
      const calendarEvents = await getProfileName(serverSideToken);
      res.send(calendarEvents)
  }
  catch (error) {
      if (error.errorCode == 'invalid_grant') {
          console.log('Interaction required');
          res.status(401).json({ status: 401, statusText: INTERACTION_REQUIRED_STATUS_TEXT });
        } else {
          console.log(`Error in /calendarevents handling: ${error}`);
          res.status(500).json({ status: 500, statusText: error })
        }
      }
})

module.exports = router;
