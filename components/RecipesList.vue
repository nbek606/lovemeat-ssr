<template>
  <div class="recipes_list">
    <RecipesListItem
      v-for="item in sortList"
      :key="item.id"
      :recipe="item"
    />
  </div>
</template>
<script>

/* import components */
import RecipesListItem from '@/components/RecipesListItem.vue'

export default {
  name: 'RecipesList',
  components: {
    RecipesListItem
  },
  props: {
    list: {
      type: [Object, Array, Boolean],
      required: true
    },
    max: {
      type: [String, Number],
      default: 'all'
    }
  },
  computed: {
    sortList () {
      if (this.max == 'all') {
        return this.list
      }

      return this.list.slice(0, this.max)
    }
  }
}
</script>
<style lang="scss" scoped>
  .recipes_list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }
</style>