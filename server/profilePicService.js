var fetch = require('node-fetch')

async function getProfilePicture(accessToken) {

    const graphResponse = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value",
        {
            method: 'GET',
            headers: {
                "accept": "application/json",
                "authorization": `bearer ${accessToken}`
            },
            encoding: 'null'
        });
    if (!graphResponse.ok) {
        throw (`Error ${graphResponse.status} calling Microsoft Graph: ${graphResponse.statusText}`);
    }
    const picture = await graphResponse.buffer();
    return picture;
}

module.exports = getProfilePicture