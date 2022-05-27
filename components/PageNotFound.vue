<template>
  <div class="error_page content_layout">
    <div class="error_page-title ">
      Ошибка 404
    </div>
    <div class="error_page-text">
      Кажется что-то не так! Страница которую вы запрашиваете, не существует. Возможно она устарела, была удалена, или был введен неверный адрес в адресной строке
    </div>
    <div 
      class="error_page-button"
      @click="sendHomePage"
    >
      Перейти на главную
    </div>
  </div>
</template>
<script>
import { RouteName } from '@/router/utils'
export default {
  name: 'PageNotFound',

  methods: {
    sendHomePage () {
      this.$router.push({
        name: RouteName.Home
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .error_page {
    padding: 0 30px;
    text-align: center;
    max-width: 800px;
    margin-top: 50px;

    &-title {
      font-size: 40px;
      padding: 20px 0;
      font-weight: 600;
    }

    &-text {
      font-size: 16px;
      color: #7e7e7e;
    }

    &-button {
      background-color: #b12a2f;
      color: #fff;
      border-radius: 10px;
      color: #fff;
      transition: all 0.5s;
      cursor: pointer;
      height: 60px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      font-size: 18px;
      transition: all 0.5s ease 0s;
      max-width: 200px;
      margin: auto;
      margin-top: 40px;

      &:hover {
        letter-spacing: 1px;
      }
    }
  }
</style>