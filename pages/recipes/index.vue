<template>
  <div 
    class="recipes content_layout"
    id="page"
  >
    <Breadcrumbs 
      :list="breadcrumbs"
    />
    <div>
      <h1
        class="global_title"
        v-if="parent"
      >
          {{ parent.title.rendered }}
      </h1>
      <RecipesList
        v-if="recipesList.length > 0"
        :list="recipesList"
        :max="'all'"
      />
      <RecipesMaket
        v-else
        :max="6"
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

/* import components */
import RecipesList from '@/components/RecipesList.vue'
import { RouteName } from '@/router/utils'
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import RecipesMaket from '@/components/RecipesMaket.vue'

export default {
  name: 'Recipes',
  components: {
    RecipesList,
    Breadcrumbs,
    RecipesMaket
  },
  mounted () {
    this.getParent('receipes')
  },
  data () {
    return {
      recipesList: [],
      parent: false,
      maxPage:0,
      currentPage: 1,
      perPage: 16
    }
  },
  computed: {
    breadcrumbs () {
      return  [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: 'Рецепты'
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
            content: this.parent.yoast_head_json.description
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: this.parent.yoast_head_json.og_description
          }
        ]
      }
    }
  },
  
  methods: {
    getParent (slug) {
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
        this.recipesList = response.data
        this.maxPage = response.headers['x-wp-totalpages']
      })
    },
    changePage (page) {
      this.recipesList = []
      this.currentPage = page
      this.getList(this.parent.id)
      this.$productService.scrollPageTop('scroll_top')
    },
  }
}
</script>
<style lang="scss" scoped>
  .recipes {
    padding: 0 30px;   
    box-sizing: border-box;
    min-height: 500px;


    h1 {
      padding-top: 0px;
    }
  }
</style>
