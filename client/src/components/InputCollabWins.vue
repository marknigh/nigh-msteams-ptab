<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['save:win'])

let win = ref({ customer: '', revenue: '', gp: '' })

function submit() {
    emit('save:win', win)
    win.value = { customer: '', revenue: '', gp: '' }
}

</script>

<template>
    <div class="control">
        <div class="field">
            <label class="label">Customer Name</label>
            <div class="control">
                <input class="input" type="text" v-model="win.customer">
            </div>
        </div>

        <div class="field">
            <label class="label">Revenue</label>
            <div class="control">
                <input class="input" type="text" v-model.number="win.revenue">
            </div>
        </div>

        <div class="field">
            <label class="label">Gross Profits</label>
            <div class="control">
                <input class="input" type="text" v-model.number="win.gp">
            </div>
        </div>

        <div class="field is-full">
            <button class="button is-primary" @click="submit">Submit</button>
        </div>
    </div>
</template>
