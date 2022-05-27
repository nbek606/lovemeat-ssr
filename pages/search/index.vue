<template>
  <div class="search content_layout">
    <Breadcrumbs
      :list="breadcrumbs"
    />
    <div 
      v-if="sortlist.length > 0"
      class="search_list"
    >
      <ProductList
        :list="sortlist"
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
      v-else
      class="empty_list"
    >
      Ничего не найдено
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import Pagination from '@/components/Pagination.vue'
import ProductList from '@/components/ProductList.vue'
import { RouteName } from '@/router/utils'

export default {
  name: 'Search',
  components: { Breadcrumbs, ProductList, Pagination },
  provide: {
    page: "collections"
  },
  data () {
    return {
      perPage: 16,
      currentPage: 1
    }
  },
  watch: {
    search: {
      handler (val) {
        if (val) {
          this.currentPage = 1
        }
      }
    }
  },
  //метаданные
  head () {
    return {
      title: 'Поиск'
    }
  },
  computed: {
    ...mapGetters({
      search: 'search/getSearchText',
      productList: 'search/getSearchProductList'
    }),

    breadcrumbs () {
      return  [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: 'Результаты поиска'
        }
      ]
    },
    list () {
      const saveData = this.productList.filter(item => item.name.includes(this.search.toLowerCase()))
      return this.$productService.cloneArray(saveData)
    },

    sortlist () {
      let limit = (this.currentPage * this.perPage) - this.perPage
      return this.list.slice(limit)
    },
    
    maxPage () {
      if (this.list.length == 0) {
        return 0
      }

      const pages = this.list.length % this.perPage != 0 
              ? this.list.length / this.perPage + 1 
              : this.list.length / this.perPage;

      return Math.trunc(pages) 
    }
  },

  methods: {
    changePage (page) {
      this.currentPage = page
      this.$productService.scrollPageTop('scroll_top')
    },

  }
}
</script>
<style lang="scss" scoped>
  .search {
    min-height: 500px;
    padding: 0 30px;
    min-height: 500px;

  }
</style>