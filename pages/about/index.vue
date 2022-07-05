<template>
<div id="page">
  <div 
    class="about content_layout"
    v-if="data"
  >
    <Breadcrumbs 
      :list="breadcrumbs"
    />
    <h1 class="global_title">
      {{ data.title.rendered}} 
    </h1>

    <div>  
      <div 
        class="reviews_content"
        v-html="data.content.rendered"
      >
      </div>
    </div>
  </div>
  <PageMaket 
    v-else
  />
</div>
</template>
<script>
import { RouteName } from '@/router/utils'

/* import components */
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import PageMaket from '@/components/PageMaket.vue'

export default {
  name: 'Reviews',
  components: {
    Breadcrumbs,
    PageMaket
  },
  data () {
    return {
      data: false
    }
  },
  mounted () {
    this.getData('about')
    this.$productService.scrollPageTop('scroll_top')
  },

  //метаданные
  head () {
    if(this.data) {
      return {
        title: this.data.yoast_head_json.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.data.yoast_head_json.description
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: this.data.yoast_head_json.og_description
          }
        ]
      }
    }
  },
  computed: {
    breadcrumbs () {
      if (!this.data) {
        return false
      }

      return  [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: this.data.title.rendered
        }
      ]
    },
  },
  methods: {
    getData (slug) {
      console.log('sss');
      this.$pageApiService.getParentBySlug(slug).then((response) => {
        this.data = response.data.find(item => item.slug == slug)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .about {
    padding: 0 30px;
    width: 100%;
    min-height: 500px;

    h1 {
      padding-top: 0;
    }
  }
</style>