<script setup lang="ts">

import { onBeforeMount, ref } from 'vue'

const city = ref('Chicago')
let context = ref('')
let weather = ref('')
let temp = ref()
let input_disable = ref(true)

onBeforeMount(() => {
    getWeather()
})

function changeCity() {
    input_disable.value = false
}

function cityBlur() {
    getWeather()
    input_disable.value = true
}

function getWeather() {
    fetch('https://nigh-teams-ptab-webapp.azurewebsites.net/weather/' + city.value)
    .then((response) => {
        console.log('fetch->weather: ', response.json())
       return response.json()
    }).then((data) => {
        weather.value = data.weather[0].main
        temp.value = Math.round(data.main.temp)
        context.value = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    }).catch((error) => {
        console.log('fetch->weather->error ', error)
    })
}
</script>

<template>
    <section class="section">    
        <p class="title2 has-text-weight-bold"> Current Weather</p>
            <figure class="is-128x128">
                <img :src = "context" />
            </figure>
            <p class="title2"> {{ weather }} </p>
            <p class="title2"> {{  temp }} &deg;</p>
            <div class="level">
                <input class="input" style="margin: 20px 20px" type="text" placeholder="City" :disabled="input_disable" v-model="city" @blur="cityBlur()">
                <i class="fas fa-edit" @click="changeCity()"></i>
            </div>
    </section>
</template>

<style>
 
</style>