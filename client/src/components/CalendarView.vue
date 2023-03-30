<template>
    <section class="section">
            <p class="title2 has-text-weight-bold"> Today's Appointments </p>
            <ul class="menu-list" v-for="event in events">
                <li>{{ event.subject }}, {{ startTime(event.start.dateTime) }}</li>
            </ul>
    </section>
</template>

<script setup>
    import { app }from "@microsoft/teams-js"
    import { onBeforeMount, ref } from "vue"
    import { Auth } from '../assets/sso_auth'
    import * as msal from "@azure/msal-browser"

    const events = ref([]);
    
    function startTime(time){
        console.log(time)
        return new Date(time).toLocaleTimeString()
    }

    const api_url = import.meta.env.VITE_API_URL

    onBeforeMount(async () => {
        const microsoftTeams = new Auth()
        microsoftTeams.get_token().then((token) => {
            app.getContext().then((context) => {
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
                        console.log('response: ', response)
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
                                redirectUri: 'http://localhost:5173/auth-start',
                                scopes: ['calendars.readbasic']
                            }).then(() => {})
                        }
                    }
                })
                .then((responseJson) => {
                    events.value = responseJson.value;
                    console.log('events: ', events.value)
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