<script setup lang="ts">
    import { app }from "@microsoft/teams-js";
    import { onBeforeMount, ref } from "vue";
    import { Auth } from '../assets/sso_auth'

    const profile = ref({ 'displayName': ''})
    onBeforeMount(() => {
        const microsoftTeams = new Auth()
        microsoftTeams.get_token().then((token) => {
            console.log(token)
            app.getContext().then((context: any) => {
                fetch('https://nigh-teams-ptab-webapp.azurewebsites.net/getProfileOnBehalfOf', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'tid': context.user.tenant.id,
                        'token': token
                    }),
                    mode: 'cors'
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
                        console.log('profile: ', profile.value)
                    }
                })
            })
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
