<template>
  <div class="cart content_layout">
    <Breadcrumbs
      :list="breadcrumbs"
    />
    <CartItem />
  </div>
</template>
<script>

/* import components */
import CartItem from '@/components/CartItem.vue'
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import { RouteName } from '@/router/utils'

export default {
  name: 'Cart',
  components: {
    CartItem,
    Breadcrumbs
  },
  data () {
    return {
      title: "Корзина"
    }
  },
  mounted () {
    this.$productService.scrollPageTop('scroll_top')
  },
  computed: {
     breadcrumbs () {
      return  [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: this.title
        },
        
      ]
    },
  },
  //метаданные
  head () {
      return {
        title: this.title
      }
  },
}
</script>
<style lang="scss" scoped>
  .cart {
    padding: 0 30px;
    width: 100%;
    min-height: 500px;

  }
</style>