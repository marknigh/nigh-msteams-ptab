<template>
    <section class="section">
        <figure class="image is-128x128">
            <img class="is-rounded" :src="profilePhoto">
        </figure>
    </section>
</template>

<script setup lang="ts">
    import { app }from "@microsoft/teams-js";
    import { onBeforeMount, ref } from "vue";
    import { Auth } from '../assets/sso_auth'
    import * as msal from "@azure/msal-browser"

    const api_url = import.meta.env.VITE_API_URL

    const profilePhoto = ref()
    
    onBeforeMount(() => {
        const microsoftTeams = new Auth()
        microsoftTeams.get_token().then((token) => {
            app.getContext().then((context: any) => {
                fetch(api_url + 'getProfilePhoto', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'tid': context.user.tenant.id,
                        'token': token
                    })
                })
                .then((response) => {
                    if (response.ok) {
                        response.blob().then((data) => {
                            profilePhoto.value = window.URL.createObjectURL(data)
                        })
                    } else {
                        if (response.status === 401) {
                            const msalConfig = {
                                auth: {
                                    clientId: import.meta.env.VITE_CLIENT_ID
                                }
                            };
                            
                            const msalInstance = new msal.PublicClientApplication(msalConfig);
                            
                            msalInstance.handleRedirectPromise().then(() => {
                                msalInstance.loginPopup({ 
                                    redirectUri: 'http://localhost:5173/auth/start',
                                    scopes: ['Calendars.ReadBasic', 'User.Read', 'MailboxSettings.Read'],
                                    prompt: 'consent'
                                }).then((response) => {
                                    console.log(response)
                                }).catch((error) => {
                                    console.log(error)
                                })
                            })

                        }
                    }
                    
                })
            }).catch((error) => {
                console.log('app.getContext(): ', error)
            })
        }).catch((error) => {
            console.log('microsoftTeams.get_token: ', error)
        }) 
    }) 

</script>


<style scoped>

</style>