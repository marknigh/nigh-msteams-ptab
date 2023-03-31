<template>
    <div></div>
</template>

<script setup lang="ts">
    import * as microsoftTeams from '@microsoft/teams-js'
    import * as msal from "@azure/msal-browser"

    microsoftTeams.app.initialize().then(() => {
         microsoftTeams.app.getContext().then(async (context: any) => {
          const msalConfig = {
            auth: {
              clientId: "#{clientId}",
              authority: `https://login.microsoftonline.com/${context.tid}`,
              navigateToLoginRequestUrl: false
            },
            cache: {
              cacheLocation: "sessionStorage",
            },
          }

          const msalInstance = new msal.PublicClientApplication(msalConfig);
          msalInstance.handleRedirectPromise()
            .then((tokenResponse: any) => {
              if (tokenResponse !== null) {
                microsoftTeams.authentication.notifySuccess(JSON.stringify({
                  sessionStorage: sessionStorage
                }));
              } else {
                microsoftTeams.authentication.notifyFailure("Get empty response.");
              }
            })
            .catch((error: any) => {
              microsoftTeams.authentication.notifyFailure(JSON.stringify(error));
            });
        });
      });

</script>

<style scoped>

</style>