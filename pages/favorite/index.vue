<template>
  <div class="favorite content_layout">
    <Breadcrumbs 
      :list="breadcrumbs"
    />
    <h1 class="global_title">Избранное</h1>
    <div v-if="list.length > 0">
      <ProductList 
        v-if="list"
        :list="sortList"
        :max="perPage"
      />
      <Pagination
        v-if="maxPage > 1"
        :current-page="currentPage"
        :max-page="maxPage"
        @change-page="changePage"
      />
    </div>
    <div 
      class="empty_list"
      v-else
    >
      У Вас пока нет товаров в  Избранном
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { RouteName } from '@/router/utils'

/* import components */
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import ProductList from '@/components/ProductList.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Favorite',
  components: { 
    Breadcrumbs,
    ProductList,
    Pagination
  },
  provide: {
    page: 'collections'
  },
  data () {
    return {
      perPage: 16,
      currentPage: 1,
      title:'Избранное'
    }
  },
  mounted () {
    this.$productService.scrollPageTop('scroll_top')
  },
  //метаданные
  head () {
      return {
        title: this.title
      }
  },
  watch: {
    list: {
      handler (val) {
        if(val) {
          this.currentPage = 1
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      list: 'favorite/getFavoriteProductList'
    }),
    sortList () {
      let limit = (this.currentPage * this.perPage) - this.perPage
      return this.list.slice(limit)
    },
    breadcrumbs () {
      return  [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: this.title
        }
      ]
    },
    emptyList () {
      return this.list.length == 0
    },
    maxPage () {
      if (this.emptyList) {
        return 0
      }

      const pages = this.list.length % this.perPage != 0 
              ? this.list.length / this.perPage + 1 
              : this.list.length / this.perPage;

      return Math.trunc(pages) 
    }
  },

  methods: {
    changePage(page) {
      this.currentPage = page
    }
  }
}
</script>
<style lang="scss" scoped>
  .favorite {
    padding: 0 30px;
    min-height: 500px;

    h1 {
      padding-top: 0;
    }
  }
</style>