<template>
   <div 
    class="search_list"
    v-if="isEnabled"
   >
    <div class="search_list-block">
      <div 
        class="search_list-item"
        v-for="item in list"
        :key="item.id"
        @click="sendProduct(item.slug)"
      >
        <div class="search_list-item-img">
          <img 
            :src="$productService.generateImg(item.images[0].src, '300')"
            v-if="item.images && item.images[0]"
          />
          <img
            v-else
            src="@/assets/icons/png/no-photo.png"
          />
        </div>
        <div class="search_list-item-title">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="price">
            {{ item.price }}
          </div>
        </div>
      </div>
    </div>
    <div 
      class="search_list-all"
      @click="sendSearchPage()"
    >
      <a>
        Посмотреть все
      </a>
    </div>
  </div> 
</template>
<script>
import { mapGetters } from 'vuex'
import { RouteName } from '@/router/utils'

export default {
  name: 'SearchList',
  data () {
    return {
      show: false,
      loader: false,
    }
  },
  created () {
     this.$store.dispatch('product/categories')
  },
  computed: {
    ...mapGetters({
      searchText: 'search/getSearchText',
      productList: 'search/getSearchProductList'
    }),
    list () {
      return this.productList.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()))
    },

    isEnabled () {
      return this.list.length > 0 && this.searchText.length > 1 && this.show && this.$route.name != 'Search'
    }
  },
  watch: {
    searchText: {
      handler (val){
        if (val) {
          this.show = true          
          this.getList()
        }
      }
    }
  },

  methods: {
    getList() {
      if (this.searchText.length < 2) {
        this.$productApiService.getSearchProductByTitle(this.searchText).then((response) => {
          this.$store.dispatch('search/searchProductList', response.data)
        })
      }
    },
    sendSearchPage () {
      this.show = false
      if (this.$route.name != RouteName.Search) { 
        this.$router.push({
          name: RouteName.Search
        })
      }
    },
    sendProduct (slug) {
      this.show = false
      this.$router.push({ 
        name:RouteName.Product,
        params: { slug: slug }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .search {
    &_list {
      position: absolute;
      z-index: 10;
      background-color: #fff;
      width: 450px;
      border: 1px solid #dadada;
      margin-top: -5px;
      box-sizing: border-box;

      @media (max-width: 1040px) {
        width: calc(100% - 20px);
        box-sizing: border-box;
      }

      &-block {
        overflow: scroll;
        max-height: 302px;
      }

      &-all {
        padding: 20px 0;
        text-align: center;

        a {
          padding: 10px;
          cursor: pointer;
          color: #b12a2f;
        }
      }

      &-item {
        display: flex;
        height: 100px;
        align-items: center;
        padding: 0px 20px;
        border-bottom: 1px solid #dadada;
        box-sizing: border-box;

        &:last-child {
          border-bottom: 0;
        }

        &-img {
          width: 60px;
          height: 60px;
          margin-right: 20px;
          cursor: pointer;

          img {
            width: 100%;
          }
        }

        &-title {

          .name {
            margin-bottom: 5px;
            cursor: pointer;
          }

          .price {
            font-weight: 600;
            &::after {
              content: "\20BD";
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
</style>