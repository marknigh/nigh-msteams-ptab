<template>
    <div></div>
</template>

<script setup lang="ts">
    import * as microsoftTeams from '@microsoft/teams-js'

    microsoftTeams.app.initialize().then(() => {
         microsoftTeams.app.getContext().then(async (context) => {
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

          const msalInstance = new window.msal.PublicClientApplication(msalConfig);
          msalInstance.handleRedirectPromise()
            .then((tokenResponse) => {
              if (tokenResponse !== null) {
                microsoftTeams.authentication.notifySuccess(JSON.stringify({
                  sessionStorage: sessionStorage
                }));
              } else {
                microsoftTeams.authentication.notifyFailure("Get empty response.");
              }
            })
            .catch((error) => {
              microsoftTeams.authentication.notifyFailure(JSON.stringify(error));
            });
        });
      });

</script>

<style scoped>

</style>