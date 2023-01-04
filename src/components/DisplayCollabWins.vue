<script setup lang="ts">

    defineProps<{wins: [{
        'customer': string,
        'revenue': string,
        'gp': string
    }]}>()

</script>

<template>
  <div class="content">
    <h2 class="has-text-centered">BIG WINS</h2>
    <dl class="px-6">
      <dt v-for="(item, index) in wins" :key="index">
          <span class="has-text-weight-bold">{{ item.customer }}</span>
          <dd> Revenue: {{ item.revenue }}</dd>
          <dd> Gross Profit: {{ item.gp }}</dd>
      </dt>
    </dl>
  </div>
</template>
  