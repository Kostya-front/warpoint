<template>
  <div>
    <CalculateTotalPlan/>
  </div>
</template>

<script setup lang="ts">
import {useCurrencyStore} from "@/features/currency/model";
import {onMounted} from "vue";
import CalculateTotalPlan from "@/features/currency/components/CalculateTotalPlan.vue";

const currencyStore = useCurrencyStore()

onMounted(() => {
  currencyStore.getCurrency()
})
</script>

<style scoped>

</style>