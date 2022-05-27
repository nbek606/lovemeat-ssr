<template>
  <div 
    class="cart"
    @click="send"
  >
    <div class="cart_count">
      <span class="cart_icon">
        <img :src="require(`@/assets/icons/png/shopping-cart.png`)" >    
      </span>
      <span class="count">
        {{ list.length }}
      </span>
    </div>
    <div class="cart_sum">
      {{ sum }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { RouteName } from '@/router/utils'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters({
      list: 'cart/getCartProductList',
      sum: 'cart/getCartSum'
    })
  },
  methods: {
    send() {
      this.$router.push({ 
        name: RouteName.Cart
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .cart {
    display: flex;
    margin-left: 100px;
    cursor: pointer;

    &_icon {
      border: 3px solid #b12a2f;
      border-radius: 50px;
      padding: 5px;
      display: flex;
      width: 37px;
      height: 37px;
      align-items: center;
      box-sizing: border-box;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .count {
      background-color: #b12a2f;
      display: flex;
      width: 22px;
      height: 22px;
      align-items: center;
      justify-content: center;
      border-radius: 50px;
      color: #fff;
      padding: 2px;
      font-size: 14px;
      position: absolute;
      margin-top: -43px;
      margin-left: 26px;
    }

    &_sum {
      margin-left: 20px;
      font-size: 25px;
      display: flex;
      align-items: center;

      &::after {
        content: "\20BD";
        margin-left: 5px;
      }
    }
  }

  img {
    width: 100%;
  }
</style>