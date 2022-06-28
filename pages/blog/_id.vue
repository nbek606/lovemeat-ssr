<template>
<div id="page">
  <div v-if="!error">
    <div
      class="blog_details content_layout"
      v-if="blog"
    >
      <Breadcrumbs 
        :list=" breadcrumbs"
      />
      
      <div>
        <h1 class="global_title">{{ blog.title.rendered }}</h1>
        <!--content-->
        <span v-html="blog.content.rendered">
        </span>
      </div>
    </div>
    
    <PageMaket
        v-else
    />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</div>
</template>
<script>
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import PageMaket from '@/components/PageMaket.vue'
import { RouteName } from '@/router/utils'
import PageNotFound from '../../components/PageNotFound.vue'
export default {
  components: { Breadcrumbs, PageMaket, PageNotFound },
  name: 'BlogDetails',
  data () {
    return {
      blog: false,
      error: false
    }
  },
  mounted () {
    this.$productService.scrollPageTop('scroll_top')
    this.getData(this.$route.params.id)
  },
  computed: {
    breadcrumbs () {
      if (!this.blog) {
        return false
      }
      return  [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: 'Блог',
          url: RouteName.Blog
        },
        {
          title: this.blog.title.rendered
        }
      ]
    },
  },
  
  //метаданные
  head () {
    if(this.blog) {
      return {
        title: this.blog.yoast_head_json.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.blog.yoast_head_json.description
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: this.blog.yoast_head_json.og_description
          }
        ]
      }
    }
  },

  methods: {
    getData(id) {
      this.$pageApiService.getPageById(id).then((response) => {
        this.blog = response.data
      }).catch(() => {
        this.error = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .blog_details {
    padding: 0 30px;
    min-height: 500px;


    h1 {
      padding-top: 0;
    }

    img {
      width: 50%;
    }
  }
</style>