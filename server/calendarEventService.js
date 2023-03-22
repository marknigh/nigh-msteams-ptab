var fetch = require('node-fetch')

async function getCalendarEvents(accessToken) {

    const currentDateTime = new Date().toISOString()
    const endDateTime = new Date(new Date().setHours(23)).toISOString()


    const url = 'https://graph.microsoft.com/v1.0/me/calendarView?' + new URLSearchParams({
        startDateTime: currentDateTime,
        endDateTime: endDateTime
    })

    const graphResponse = await fetch(url,
        {
            method: 'GET',
            headers: {
                // 'prefer': 'outlook.timezone=\"central daylight time\"',
                'authorization': `bearer ${accessToken}`
            },
            cache: 'default'
        });
    if (!graphResponse.ok) {
        throw (`Error ${graphResponse.status} calling Microsoft Graph: ${graphResponse.statusText}`);
    }
    const events = await graphResponse.json();
    return events;
}

module.exports = getCalendarEvents