<template>
  <div 
    class="loader"
    v-if="loader"
  >
    <div class="loader_spin"></div>
    <h2 class="loader_title">Загрузка данных...</h2>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Loader',
  computed: {
    ...mapGetters({
      loader: 'modal/getLoader'
    })
  }
}
</script>
<style lang="scss" scoped>
  .loader {
    width: 100%;
    position: fixed;
    height: 100vh;
    background-color: rgba(17,14,25, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
    top: 0;

    &_spin {
      border: 7px solid #f3f3f3;
      border-radius: 50%;
      border-top: 7px solid #b12a2f;
      width: 30px;
      height: 30px;
      -webkit-animation: spin 2s linear infinite; /* Safari */
      animation: spin 2s linear infinite;
    }

    &_title {
      color: #fff;
      font-weight: 500;
      font-size: 18px;
    }

    /* Safari */
    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }

</style>