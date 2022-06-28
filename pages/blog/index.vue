<template>
  <div 
    class="blog content_layout"
    id="page"
  >
    <div>
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
     <div class="pagination">
      <Pagination 
        v-if="maxPage > 1"
        :currentPage="currentPage"
        :maxPage="maxPage"
        @change-page="changePage"
      />
    </div>
  </div>
</template>
<script>

/* import component */
import BlogList from '@/components/BlogList.vue'
import { RouteName } from '@/router/utils'
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import BlogMaket from '@/components/BlogMaket.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Blog',
  components: {
    BlogList,
    Breadcrumbs,
    BlogMaket,
    Pagination
  },
  data () {
    return {
      blogList: false,
      parent: false,
      maxPage: 0,
      currentPage: 1,
      perPage: 16,
      slug: 'blog'
    }
  },
  mounted () {
    this.getParent(this.slug)
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
      this.$pageApiService.getPagesByParentId(parentId, this.currentPage, this.perPage).then((response) => {
        this.blogList = response.data
        this.maxPage = response.headers['x-wp-totalpages']
      })
    },
    changePage (page) {
      this.blogList = false
      this.currentPage = page
      this.getList(this.parent.id)
      this.$productService.scrollPageTop('scroll_top')
    },
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