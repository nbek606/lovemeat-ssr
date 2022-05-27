<template>
  <div class="content_layout">
      <h1 
        class="blog_title global_title"
        v-if="parent"
      >
        {{ parent.title.rendered }}
      </h1>
      <BlogList
        v-if="blogList"
        :list="blogList"
        :max="2"
      />
  </div>
</template>
<script>

/* import components */

import BlogList from './BlogList.vue'

export default {
  name: 'HomeBlogWidget',
  components: {
    BlogList
  },
  data () {
    return {
      parent: false,
      blogList: false,
    }
  },
  mounted () {
    this.getParent('blog')
  },
  computed: {
    sortList () {
      return this.list.slice(0, 2)
    }
  },
  methods: {
     getParent(slug) {
      this.$pageApiService.getParentBySlug(slug).then((response) => {
        this.parent = response.data.find(item => item.slug == slug)
    
        if (!this.parent) {
          return false
        }
        this.getList(this.parent.id)
      })
    },
    getList (parentId) {
      this.$pageApiService.getPagesByParentId(parentId).then((response) => {
        this.blogList = response.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .blog {
    display: flex;
    margin-bottom: 45px;

    @media (max-width: 800px) {
      flex-direction: column;
    }

    &_item {
      width: calc(50% - 22.5px);
      position: relative;
      

      @media (min-width: 800px) {
        &:nth-child(1) {
          margin-right:45px;
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
          margin-top: 20px;
          font-size: 2rem;
          z-index: 3;

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
  }

  img {
    width: 100%;
  }
</style>