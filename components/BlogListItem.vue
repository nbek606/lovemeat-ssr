<template>
  <div 
    class="blog_list-item"
  > 
      <div 
        class="blog_list-item-title"
        v-html="blog.title.rendered"
        @click="send"
      />

      <div 
        class="blog_list-item-img"
        v-if="blog.yoast_head_json.og_image[0]"
      >
        <img :src="generateImg(blog.yoast_head_json.og_image[0].url)">
      </div>
  </div>
</template>
<script>
import { RouteName } from '../router/utils'
export default {
  name: 'BlogListItem',
  props: {
    blog: {
      type: [Array, Object],
      required: true
    }
  },
  methods: {
    send () {
      this.$router.push({
        name: RouteName.BlogDetails,
        params: {
          slug: this.blog.slug
        }
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
 .blog_list-item {
      width: calc(50% - 22.6px);
      position: relative;
      margin-bottom: 45px;
      box-sizing: border-box;

      @media (min-width: 800px) {
        &:nth-child(2n) {
          margin-left:45px;
        }
      }

      @media (max-width: 800px) {
         width: 100%;
         margin-top: 45px;
      }
      
      &-img {
        &:before{
          content: "";
          display: block;
          height: calc(100% - 4px);
          width: 100%;
          background-color: black;
          z-index: 2;
          opacity: 0.4;
          position: absolute;
        }
      }

      &-title {
          position: absolute;
          color: #fff;
          text-decoration: none;
          padding: 20px;
          box-sizing: border-box;
          margin-top: 20px;
          font-size: 2rem;
          z-index: 3;
          cursor: pointer;

          @media (max-width: 1024px) {
            font-size: 1.6rem;
          }

          @media (max-width: 800px) {
            font-size: 2.5rem;
          }

          @media (max-width: 620px) {
            font-size: 2rem;
          }

          @media (max-width: 450px) {
            font-size: 1.6rem;
          }

          @media (max-width: 450px) {
            font-size: 1.5rem;
          }

          @media (max-width: 400px) {
            font-size: 1.3rem;
          }

          @media (max-width: 340px) {
            font-size: 1.2rem;
          }
      }
    }

    img {
      width: 100%;
    }
</style>