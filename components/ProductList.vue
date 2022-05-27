<template>
  <div class="product_list">
    <ProductListItem
      v-for="(item, index) in sortList"
      :key="item.id"
      :product="item"
      :product-index="index"
      :list-size="sortList.length"
    />
  </div>
</template>
<script>

/* import components */
import ProductListItem from '@/components/ProductListItem.vue'

export default {
  name: 'ProductList',
  components: {
    ProductListItem
  },
  props: {
    max: {
      type: [Number, String],
      default: 10000
    },
    list: {
      type: [Object, Array, Boolean],
      required: true
    } 
  },

  computed: {
    sortList () {
      if (this.list.length == 0) {
        return false
      }
  
      return this.list.slice(0, this.max)
    }
  }
}
</script>
<style lang="scss" scoped>
  .product_list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;
  }
  
</style>