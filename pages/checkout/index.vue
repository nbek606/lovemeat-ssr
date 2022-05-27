<template>
  <div class="checkout content_layout">
    <Breadcrumbs
      :list="breadcrumbs"
    />
    <div 
      class="link"
      @click="sendLogIn"
      v-if="!accountToken"
    >
      У Вас есть аккаунт?
      <span class="link_send">
        Войти
      </span>
    </div>
    <!---->
    <CheckoutItem />
  </div>
</template>
<script>

import CheckoutItem from '@/components/CheckoutItem.vue'
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import { RouteName } from '@/router/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'Checkout',
  components: {
    CheckoutItem,
    Breadcrumbs
  },
  data () {
    return {
      title: "Оформление заказа"
    }
  },
  mounted () {
    this.$productService.scrollPageTop('scroll_top')
  },
  
  //метаданные
  head () {
    return {
      title: this.title
    }
  },
  computed: {
    ...mapGetters({
       accountToken: 'account/getAccountToken'
    }),
    
    breadcrumbs () {
      return [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: "Корзина",
          url: RouteName.Cart
        },
        {
          title: this.title
        }
      ]
    },
  },
  methods: {
    sendLogIn() {
      this.$router.push({
        name: RouteName.PersonalAccount
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .checkout {
    padding: 0 30px;
    min-height: 500px;

    .link {
      padding-bottom: 20px;

      &_send {
        cursor: pointer;
        color:#4c8af6;
      }
    }
  }
</style>