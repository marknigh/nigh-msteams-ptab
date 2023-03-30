var express = require('express');
var router = express.Router();
var getProfileName = require('../profileNameService');
var getOboAccessToken = require('../oboService');

router.post('/', async (req, res) => {

  const tenantId = req.body.tid;
  const clientSideToken = req.body.token;

  
  try{
      const serverSideToken = await getOboAccessToken(tenantId, clientSideToken, req)
      const calendarEvents = await getProfileName(serverSideToken);
      res.send(calendarEvents)
  }
  catch (error) {
    if (error.errorCode == 'invalid_grant') {
      res.status(401).json({ status: 401, statusText: 'INTERACTION_REQUIRED_STATUS_TEXT' });
    } else {
      res.status(500).json({ status: 500, statusText: error })
    }
  }

})

module.exports = router;
