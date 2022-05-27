<template>
  <div class="base_page">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
  .base_page {
    padding: 0 150px;
    box-sizing: border-box;

    @media (max-width: 1200px) {
      padding: 0 30px;
    }
  }
</style>