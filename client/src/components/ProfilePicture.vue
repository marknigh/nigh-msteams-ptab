<template>
    <section class="section">
        <figure class="image is-128x128">
            <img class="is-rounded" :src="profilePhoto">
        </figure>
    </section>
</template>

<script setup lang="ts">
    import { app, profile }from "@microsoft/teams-js";
    import { onBeforeMount, ref } from "vue";
    import { Auth } from '../assets/sso_auth'

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
                    response.blob().then((data) => {
                        profilePhoto.value = window.URL.createObjectURL(data)
                    })
                    
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