<template>
  <div 
    id="page"
  >
    <div v-if="!error">
      <div 
        class="recipes_details content_layout"
        v-if="data"
      >
        <Breadcrumbs
          :list="breadcrumbs"
        />
        <h1 class="global_title">
          {{ data.title.rendered }}
        </h1>
        <div
          v-html="data.content.rendered"
        />
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
  name: 'RecipesDetails',
  data () {
    return {
      data: false,
      error: false
    }
  },
  mounted () {
    this.$productService.scrollPageTop('scroll_top')
    this.getData(this.$route.params.id)
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
          title: 'Рецепты',
          url: RouteName.Recipes
        },
        {
          title: this.data.title.rendered
        }
      ]
    },
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
  methods: {
    getData (id) {
      this.$pageApiService.getPageById(id).then((response) => {
        this.data = response.data
      }).catch(() => {
        this.error = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  #page {
    padding-top: 100px;
  }
  
  .recipes_details {
    padding: 0 30px;
    width: 100%;
    min-height: 500px;

    .global_title {
      margin-top: 0;
      padding-top: 0;
    }

  }

  img {
    width: 200px !important; 
  }
</style>