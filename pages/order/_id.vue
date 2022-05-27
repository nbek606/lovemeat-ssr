<template>
  <div id="order">
    <div 
      class="order content_layout"
      v-if="order"
    >
      <Breadcrumbs
        :list="breadcrumbs"
      />
      <OrderItem 
        :order="order"
      />
    </div>
    <PageMaket 
      v-else
    />
  </div>
</template>
<script>

/* import components */
import OrderItem from '@/components/OrderItem.vue'
import { RouteName } from '@/router/utils'
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import PageMaket from '@/components/PageMaket.vue'

export default {
  name: 'Order',
  components: {
    OrderItem,
    Breadcrumbs,
    PageMaket
  },
  data () {
    return {
      order: false,
      title: 'Страница заказа'
    }
  },

     //метаданные
  head () {
    return {
      title: this.title
    }
  },
  mounted () {
    this.getOrder(this.$route.params.id)
    this.$productService.scrollPageTop('order')
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
        }
      ]
    },
  },  
  methods: {
    getOrder(id) {
      this.$orderApiService.getOrderById(id).then((response) => {
        this.order = response.data
      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .order {
    padding: 0 30px;
    min-height: 700px;
    padding-bottom: 100px;
    min-height: 500px;

  }
</style>