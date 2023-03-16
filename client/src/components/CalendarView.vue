<template>
    <div>
        <section class="section">this worked</section>
    </div>
</template>

<script setup lang="ts">
    import { app }from "@microsoft/teams-js";
    import { onBeforeMount, ref } from "vue";
    import { Auth } from '../assets/sso_auth'

    const event = ref({})

    const api_url = import.meta.env.VITE_API_URL

    onBeforeMount(() => {
        const microsoftTeams = new Auth()
        microsoftTeams.get_token().then((token) => {
            app.getContext().then((context: any) => {
                fetch(api_url + 'calendarevent', {
                    method: 'get',
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
                        event.value = responseJson;
                    }
                })
            })
        })    
    }) 

</script>

<style scoped>

</style>