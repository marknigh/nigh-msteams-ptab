<template>
    <section class="section">
            <p class="title2 has-text-weight-bold"> Today's Appointments </p>
            <ul class="menu-list" v-for="event in events">
                <li>{{ event.subject }}, {{ event.start }}</li>
            </ul>
    </section>
</template>

<script setup lang="ts">
    import { app }from "@microsoft/teams-js"
    import { onBeforeMount, reactive } from "vue"
    import { Auth } from '../assets/sso_auth'
    import * as msal from "@azure/msal-browser"

    var events = reactive([{ subject: '',
                                start: Date}])

    const api_url = import.meta.env.VITE_API_URL

    onBeforeMount(() => {
        const microsoftTeams = new Auth()
        microsoftTeams.get_token().then((token) => {
            app.getContext().then((context: any) => {
                fetch(api_url + 'calendarevent', {
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
                        return response.json();
                    } else {
                        if (response.status === 401) {
                            const msalConfig = {
                                auth: {
                                    clientId: import.meta.env.VITE_CLIENT_ID
                                }
                            };
                            const msalInstance = new msal.PublicClientApplication(msalConfig);
                            msalInstance.handleRedirectPromise();

                            msalInstance.loginPopup({ 
                                redirectUri: 'http://localhost:5173/auth-end',
                                scopes: ['calendars.readbasic']
                            }).then(() => {})

                        }
                    }
                })
                .then((responseJson) => {
                    events = responseJson.value;
                })
                .catch((error) => {
                    console.log('CalendarView.vue-> Catch -> fetch: ', error)
                })
            })
        })    
    }) 

</script>

<style scoped>

</style>