<template>
  <transition name="fade">
    <div 
      class="modal_cart"
      v-show="modalAddCart"
    >
      <div class="add_cart">
        <span 
          class="material-icons add_cart-close"
           @click="close"
        >
          close
        </span>
        <div class="add_cart-top">
          <div class="add_cart-title">
            Товар добавлен в корзину
          </div>
        </div>
        <div class="add_cart-center">
          <span>{{ `Товаров в корзине: (${list.length})`}}</span>
          <span>{{  `На сумму  (${sum}) Р.`}}</span>
        </div>
        <div class="add_cart-buttons">
          <button 
            class="contine"
            @click="close"
          >
            Продолжить просмотр
          </button>
          <button 
            class="cart_check"
            @click="sendCart"
          >
            Перейти в корзину
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { RouteName } from '@/router/utils'
export default {
  name: 'CartAdded',
  computed: {
    ...mapGetters({
      list: 'cart/getCartProductList',
      sum: 'cart/getCartSum',
      modalAddCart: 'cart/getModalAddCart'
    }),
  },

  methods: {
    close () {
      this.$store.dispatch('cart/modalAddCart', false)
    },
    sendCart () {
      this.$router.push({
        name: RouteName.Cart
      })

      this.close()
    }
  }
}
</script>
<style lang="scss" scoped>
  .modal_cart {
    width: 100%;
    height: 100vh;
    background-color: rgba(31,31,31, 0.4);
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 19;
    transition: 0.7s;
  }

  .add_cart {
    background-color: #fff;
    display: inline-block;
    color: #b12a2f;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    position: absolute;
    z-index: 20;

    @media (max-width: 600px) {
      padding: 30px 20px;
    }

    @media (max-width: 380px) {
      padding: 30px 10px;
    }
    
    &-close {
      right: 20px;
      top:20px;
      position: absolute;
      font-size: 30px;
      cursor: pointer;
      display: block;
      z-index: 12;
    }
    
    &-center {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      box-sizing: border-box;
    }

    &-top {
      text-transform: uppercase;
      display: flex;
      justify-content: center;
      text-align: center;
      box-sizing: border-box;
      position: relative;

      @media (max-width: 600px) {
        margin-top: 30px;
      }
    }

    &-title {
      font-weight: 500;
      font-size: 20px;
      padding-bottom: 20px;
      text-align: center;
      display: flex;
      justify-content: center;

      @media (max-width: 380px) {
        font-size: 18px;
      }
    }

    &-buttons {
      padding-top: 40px;

      @media(max-width: 600px) {
        display: flex;
        flex-direction: column;
      }

      button {
        padding: 10px 20px;
        font-size: 14px;
        background-color: transparent;
        border: 2px solid silver;
        width: 240px;
        border-radius: 5px;
        text-transform: uppercase;
        cursor: pointer;
        box-sizing: border-box;
        transition: all 0.5s ;

        @media(max-width: 600px) {
          margin: auto;
        }
        
        @media (max-width: 380px) {
          width: 200px;
        }

        &:first-child {
          margin-right: auto;
          margin-right: 40px;
          border-color: #b12a2f;
          color: #b12a2f;

          @media(max-width: 600px) {
            margin: auto;
          }
          
          &:hover {
            background-color: #b12a2f;
            color: #fff;
          }
        }

        &:last-child {
          margin-left: auto;
          border-color: #008ecf;
          color: #008ecf;

          @media(max-width: 600px) {
            margin: auto;
            margin-top: 20px;
          }
          

          &:hover {
            background-color: #008ecf;
            color: #fff;
          }
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>