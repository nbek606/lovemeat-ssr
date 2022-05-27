<template>
  <div 
    class="callback_button"
    @click="showModal"
  >
    Заказать звонок
  </div>
</template>
<script>
export default {
  name: 'CallBackButton',
  methods: {
    showModal() {
      this.$store.dispatch('modal/requestCall', true)
    }
  }
}
</script>
<style lang="scss" scoped>
  .callback_button {
      width: 160px;
      border: 2px solid #b12a2f;
      box-sizing: border-box;
      border-radius: 20px;
      text-align: center;
      padding: 2px 5px;
      color: #1f1f1f;
      cursor: pointer;
  }
</style>