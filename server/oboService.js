const msal = require('@azure/msal-node');

async function getOboAccessToken(tenantId, clientSideToken, req) {
    
    // MSAL config
    const msalConfig = {
        auth: {
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        },
        system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                if (!containsPii) console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Info,
        }
        }
    };
  
    // Create msal application object
    var msalClient = new msal.ConfidentialClientApplication(msalConfig);
  
    // var scopes = ["https://graph.microsoft.com/User.Read"];
    var scopes = ['calendars.ReadBasic', 'MailboxSettings.Read', 'User.Read']

    var oboPromise = new Promise((resolve, reject) => {
        msalClient.acquireTokenOnBehalfOf({
            authority: `https://login.microsoftonline.com/common`,
            oboAssertion: clientSideToken,
            scopes: scopes,
        })
        .then((result) => {
            resolve(result.accessToken)
        })
        .catch((error) => {
            reject(error)
        }); 
    });

    return oboPromise
}
module.exports = getOboAccessToken