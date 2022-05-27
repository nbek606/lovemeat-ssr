<template>
  <div 
    class="blog content_layout"
    id="page"
  >
    <Breadcrumbs 
      :list="breadcrumbs"
    />
    <h1 
      class="global_title"
      v-if="parent"
    >
      {{ parent.title.rendered }}
    </h1>
    <BlogList
      v-if="blogList"
      :list="blogList"
    />
    <BlogMaket
      v-else
      :max="2"
    />
  </div>
</template>
<script>

/* import component */
import BlogList from '@/components/BlogList.vue'
import { RouteName } from '@/router/utils'
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import BlogMaket from '@/components/BlogMaket.vue'

export default {
  name: 'Blog',
  components: {
    BlogList,
    Breadcrumbs,
    BlogMaket
  },
  data () {
    return {
      blogList: false,
      parent: false
    }
  },
  mounted () {
    this.getParent('blog')
  },

  computed: {
    breadcrumbs () {

      if (!this.parent) {
        return []
      }

      return  [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: this.parent.title.rendered
        }
      ]
    },
  },
 
  //метаданные
  head () {
    if(this.parent) {
      return {
        title: this.parent.yoast_head_json.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.parent.yoast_head_json.title
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: this.parent.yoast_head_json.og_title
          }
        ]
      }
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
    padding: 0 30px;
    width: 100%;
    min-height: 500px;

  }
</style>