<template>
  <div 
    class="categories"
    id="categories"
    :class="{ pointer_none: getProductDataLoader }"
  >
    <div 
      class="categories_item"
      :class="{ 'categories_item-active': category.slug == $route.params.slug }"
      v-for="category in categories"
      :key="category.id"
      @click="sendCategory(category)"
    >
      {{ category.name }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { RouteName } from '@/router/utils'
export default {
  name: 'Categories',
  computed: {
    ...mapGetters({
      getCategories: 'product/getCategories', 
      getProductDataLoader: 'product/getProductDataLoader'
    }),
    categories () {
      if (this.getCategories == false ) {
        return []
      }
      return this.getCategories.filter(item => item.slug != 'misc')
    }
  },
  methods: {
    sendCategory(category) {
      if (category.id == this.$route.params.id) {
        return false
      }

      this.$router.push({
        name: RouteName.CollectionByCategory,
        params: { slug: category.slug }
      })

      this.$store.dispatch('menu/itemCategory', category)
    },
    
  }
}
</script>
<style lang="scss" scoped>
  .categories {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b12a2f;
    color: #fff;
    margin-top: 10px;
    flex-wrap: wrap;
    border-bottom: 1px solid #ffffff;
    font-weight: 500;

    @media (max-width: 1040px) {
      display: none;
    }

    &_item {
      height: 50px;
      text-transform: uppercase;
      padding: 0 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.5s;

      @media (max-width: 1040px) {
        display: none;
        padding: 0 10px;
      }

      @media (max-width: 1300px) {
        padding: 0 30px;
      }

      &-active {
        background-color: #89413b;
      }

      &:hover {
        background-color: #89413b;
      }
    }
  }
</style>