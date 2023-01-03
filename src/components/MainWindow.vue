<script setup lang="ts">
import { fluentButton, fluentTextField } from '@fluentui/web-components';
// import { ref } from 'vue'
// defineProps<{ msg: string }>()


</script>

<template>
    <div class="ms-fontWeight-semibold ms-fontsize-68">MICROSOFT TEAM PERSONAL TAB APPLICATION</div>
    <fluent-card class="ms-depth-64 space">
        <div class="ms-Grid" dir="ltr">
            <div class="ms-Grid-row">
                <div class="ms-Grid-col ms-sm12 ms-md6 ms-lg12">
                    <fluent-text-field class="ms-sm12 ms-md6 ms-lg12" appearance="outline" placeholder="Full Name">Full Name</fluent-text-field>
                </div>
                <div class="ms-Grid-col ms-sm12 ms-md6 ms-lg12">
                    <fluent-text-field class="ms-sm12 ms-md6 ms-lg12" appearance="outline" placeholder="Address">Address</fluent-text-field>
                </div>
                <div class="ms-Grid-col ms-sm12 ms-md6 ms-lg12">
                    <fluent-text-field class="ms-sm12 ms-md6 ms-lg12" appearance="outline" placeholder="Password">Password</fluent-text-field>
                </div>
                <div class="ms-Grid-col ms-sm12 ms-md6 ms-lg12">
                    <fluent-button class="ms-sm12 ms-md6 ms-lg12" appearance="accent"> SUBMIT </fluent-button>
                </div>
            </div>
        </div>
    </fluent-card>
</template>


<style scoped>
body {
  font-family: sans-serif;
  padding: 1em;
}
.space {
 padding: 32px
}
</style>
