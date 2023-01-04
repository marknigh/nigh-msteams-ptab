<script setup lang="ts">

  defineProps(['wins'])

</script>

<template>
  <div class="content">
    <h2 class="has-text-centered">BIG WINS</h2>
    <dl class="px-6">
      <dt v-for="w in wins">
          <span class="has-text-weight-bold">{{ w.customer }}</span>
          <dd> Revenue: {{ w.revenue }}</dd>
          <dd> Gross Profit: {{ w.gp }}</dd>
      </dt>
    </dl>
  </div>
</template>
  