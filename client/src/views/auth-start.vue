<template>
    
</template>

<script setup lang="ts">
    import * as microsoftTeams from "@microsoft/teams-js"
    import * as msal from "@azure/msal-browser"

    microsoftTeams.app.initialize().then(() => {
        // Get the tab context, and use the information to navigate to Azure AD login page
        microsoftTeams.app.getContext().then(async (context: any) => {

            var scope = "User.Read Calendars.ReadBasic MailboxSettings.Read";
            var loginHint = context.user?.loginHint;

            const msalConfig = {
                auth: {
                    clientId: "#{clientId}",
                    authority: `https://login.microsoftonline.com/${context.user.tenant.id}`,
                    navigateToLoginRequestUrl: false
                },
                cache: {
                    cacheLocation: "sessionStorage",
                },
            };

            const msalInstance = new msal.PublicClientApplication(msalConfig);
            const scopesArray = scope.split(" ");
            const scopesRequest = {
                scopes: scopesArray,
                redirectUri: window.location.origin + `/auth-end`,
                loginHint: loginHint
            };
            
            await msalInstance.loginRedirect(scopesRequest);

        })
    }).catch((error) => {
        console.log('microsoftteams.app.init: ', error)
    })

</script>

<style scoped>

</style>