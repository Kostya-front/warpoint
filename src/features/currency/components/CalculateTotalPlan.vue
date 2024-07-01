<template>
  <form @submit.prevent="onSubmit" class="form">
    <select v-model="currencyStore.tariffData.tariffPlan" class="form-select" aria-label="Default select example">
      <option value="" disabled selected>Выберите тарифный план</option>
      <option value="simple">Простой</option>
      <option value="pro">Продвинутый</option>
    </select>

    <select v-model="currencyStore.tariffData.currencyType" class="form-select" aria-label="Default select example">
      <option value="" disabled selected>Выберите валюту</option>
      <option value="KZT">Тенге</option>
      <option value="CNY">Юань</option>
    </select>

    <select v-model="currencyStore.tariffData.period" class="form-select" aria-label="Default select example">
      <option value="" disabled selected>Выберите период оплаты</option>
      <option value="month">Месяц</option>
      <option value="year">Год</option>
    </select>

    <div v-if="currencyStore.discountPrice" class="alert alert-success" role="alert">
      Ваша скидка составит - {{currencyStore.roundDiscountPrice}}
    </div>

    <div v-if="currencyStore.errorMessage" class="alert alert-danger" role="alert">
      {{currencyStore.errorMessage}}
    </div>

    <div v-if="currencyStore.totalSum" class="alert alert-dark" role="alert">
      Итоговая цена - {{currencyStore.roundTotalSum}}
    </div>

    <button class="btn btn-primary" type="submit">Рассчитать</button>
  </form>
</template>

<script setup lang="ts">
import {useCurrencyStore} from "@/features/currency/model";

const currencyStore = useCurrencyStore()

function onSubmit() {
  currencyStore.calculateTotalSum()
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>