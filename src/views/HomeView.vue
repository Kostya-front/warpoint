<script setup lang="ts">

import Calculator from "@/widgets/Calculator.vue";
</script>

<template>
  <main class="main">
    <Calculator/>
  </main>
</template>


<style lang="scss" scoped>
main {
  height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  @media screen and (min-width: 767px) {
    grid-template-columns: 30%;
  }
}
</style>
