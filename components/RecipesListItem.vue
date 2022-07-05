<template>
  <div
    class="recipes_list-item"
  >
    <div 
      class="recipes_list-item-img"
      v-if="recipe.yoast_head_json.og_image[0]"
    >
      <img :src="generateImg(recipe.yoast_head_json.og_image[0].url)" />
    </div>
    <div 
      class="recipes_list-item-title"
      @click="send(recipe.slug)"
    >
      {{ recipe.title.rendered }}
    </div>
  </div>
</template>
<script>
import { RouteName } from '../router/utils'
export default {
  name: 'RecipesListItem',
  props: {
    recipe: {
      type: [Array, Object],
      required: true
    }
  },
  methods: {
    send (slug) {
      this.$productService.scrollPageTop('scroll_top')
      this.$router.push({
        name: RouteName.RecipesDetails,
        params: { slug: slug }
      })
    },

    generateImg (img) {
      
      let format = '.png'

      if (img.includes('.jpg')) {
        format = '.jpg'
      }

      if (img.includes('.jpeg')) {
        format = '.jpeg'
      }

      return `${img.split(format)[0]}-450x450${format}`
    }
  }
}
</script>
<style lang="scss" scoped>
 .recipes_list-item {
      width: calc(33% - 30px);
      border: 1px solid #6b6b6b;
      margin-bottom: 45px;

      @media (min-width: 1024px) {

        &:nth-child(1n) {
          margin-right:45px;
        }

        &:nth-child(3n) {
          margin-right:0;
        }
      }

      @media (max-width: 1024px) {
        margin-top: 45px;
        width: 100%;

        &:nth-child(1) {
            margin-top: 0px;
        }
      }

      &-title {
        padding: 13px 0;
        font-size: 20px;
        text-transform: uppercase;
        font-weight: 600;
        text-align: center;
        cursor: pointer;
        transition: all 0.5s;

        &:hover {
          color: #810c0c;
        }
      }
      

      &-img {
        img {
          width: 100%;
          border-bottom: 1px solid #6b6b6b;
        }
      }
    }
</style>