<script setup lang="ts">
    import { app }from "@microsoft/teams-js";
    import { onBeforeMount, ref } from "vue";
    import { Auth } from '../assets/sso_auth'

    const profile = ref({ 'displayName': ''})

    const api_url = import.meta.env.VITE_API_URL

    onBeforeMount(() => {
        const microsoftTeams = new Auth()
        microsoftTeams.get_token().then((token) => {
            app.getContext().then((context: any) => {
                fetch(api_url + 'getProfileName', {
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
                        console.log('fetch->getProfileOnBehalfOf: ', response)
                    }
                })
                .then((responseJson) => {
                    if (responseJson.error) {
                        console.log('error', responseJson)
                    } else {
                        profile.value = responseJson;
                    }
                })
                .catch((error) => {
                    if (error.statusText === 'INTERACTION_REQUIRED_STATUS_TEXT') {
                        console.log('INTERACTION_REQUIRED_STATUS_TEXT')
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

<template>
    <section class="section">
        <a href="https://cdw.com">
            <img src="../assets/CDW-logo.png">
        </a>
        <p class="title"> CDW BIG WINS!! </p>
        <p class="title2"> WELCOME, {{ profile.displayName }}!! </p>
    </section>
</template>
