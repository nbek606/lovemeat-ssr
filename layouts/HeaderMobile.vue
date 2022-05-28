<template>
  <div 
    class="header_mobile"
    id="categories_mobile"
  >
    <!--всплывающее меню-->
    <div 
      class="header_mobile-menu"
      :class="{ 'header_mobile-menu-active':activeLeftMenu }"
    >
      <div class="header_mobile-menu-header">
        <div 
          class="header_mobile-menu-close"
          @click="activeLeftMenu = !activeLeftMenu"  
        >
          <span class="material-icons">
            close
          </span>
        </div>
        <!--категории-->
      </div>
      <div class="header_mobile-menu-block">
        <!--категории-->
        <div class="header_mobile-menu-list">
          <div 
            class="header_mobile-menu-list-item"
            v-for="category in categories"
            :key="category.id"
            @click="sendCategory(category.slug)"
          >
            <a>
              {{ category.name }}
            </a>
          </div>
        </div>
        <!--пользователь-->
        <div class="header_mobile-menu-user">
          <div 
            class="user"
            @click="sendPage('PersonalAccount')"
          >
            <span class="user_icon">
              <img :src="require(`@/assets/icons/png/user.png`)" >
            </span>
            <span class="user_link">
              Личный кабинет
            </span>
          </div>
        </div>
        <!--меню-->
        <div class="header_mobile-menu-list">
          <div 
            class="header_mobile-menu-list-item"
            v-for="(item, index) in menuList.nav"
            :key="index"
            @click="sendPage(item.url)"
          >
             <a>{{ item.title }}</a>
          </div>
        </div>
      </div>
    </div>

    <div 
      class="search_mobile-block"
      :class="{ 'search_mobile-block-active': searchBlock }"
    >
      <input 
        placeholder="Поиск"
        v-model="searchText"
        class="search_mobile-block-input"
      />
      <span 
        class="search_mobile-block-close material-icons"
        @click="searchClose"
      >
        close
      </span>
    </div>
    
    <div class="search_list">
      <SearchList key="mobile"/>
    </div>
    <div 
      class="header_mobile-block"
      :class="{ 'header_mobile-block-hide': searchBlock}"
    >
      <div class="left">
        <div 
          class="left_menu"
          @click="openLeftMenu"
        >
          <span class="material-icons burger_icon icons">
            menu
          </span>
        </div>
        <div 
          class="left_title"
          @click="sendPage('Home')"
        >
          LoveMeat
        </div>
      </div>
      <div class="right">
        <div class="right_request-call">
          <span 
            class="material-icons icons"
            @click="showRequestCall"
          >
            phone
          </span>
        </div>
        <div 
          class="right_search"
          @click="openSearch"
        >
          <span class="material-icons icons">
            search
          </span>
        </div>
        <div class="right_heart">
          <span 
            class="material-icons icons"
            @click="sendPage('Favorite')"
          >
            favorite_border
          </span>
        </div>
        <div 
          class="right_cart"
          @click="sendCart"
        >
          <div class="right_cart-icon">
            <img :src="require('@/assets/icons/png/mobile-cart.png')"/>
          </div>
          <div class="right_cart-counter">
            {{ getCartProductList.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import { RouteName } from '@/router/utils'
import ClickOutside from 'vue-click-outside'
import SearchList from './SearchList.vue'


export default {
  components: { SearchList },
  name: 'HeaderMobile',
  directives: {
    ClickOutside
  },
  props: {
    menuList: {
      type: [Array, Object],
      required: true
    }
  },

  data () {
    return {
      searchBlock: false,
      searchText: '',
      activeLeftMenu: false
    }
  },

  computed: {
     ...mapGetters({
        getCategories: 'product/getCategories', 
        getCartProductList: 'cart/getCartProductList'
       }),

    categories () {
      if (this.getCategories == false ) {
        return []
      }
      return this.getCategories.filter(item => item.slug != 'misc')
    }
  },

  watch: {
    searchText: {
      handler (val){
        if (val) {
          this.$store.dispatch('search/searchText', this.searchText)
        }
      }
    }
  },

  methods: {
    openSearch () {
      this.searchBlock = !this.searchBlock
      this.activeLeftMenu = false
    },
    openLeftMenu () {
      this.activeLeftMenu = !this.activeLeftMenu
      this.searchClose()
    },

    sendSearchPage () {
      this.$store.dispatch('search/searchText', this.searchText)
      
      if (this.$route.name != RouteName.Search) { 
        this.$router.push({
          name: RouteName.Search
        })
      }
    },
    searchClose () {
      this.searchBlock = false
      this.searchText = ''
      this.$store.dispatch('searchText', this.searchText)
    },

    sendCart () {
      this.$router.push({ 
        name: RouteName.Cart
      })

      this.activeLeftMenu = false
    },
    sendPage (name) {
      this.$productService.scrollPageTop('scroll_top')
      this.$router.push({
        name: RouteName[name]
      })
      this.activeLeftMenu = false
    },
    sendCategory(slug) {
      if (slug == this.$route.params.slug) {
        return false
      }

      this.$productService.scrollPageTop('scroll_top')
      
      this.$router.push({ 
        name:RouteName.CollectionByCategory,
        params: { slug: slug }
      })

      this.activeLeftMenu = false
    },

    showRequestCall () {
      this.$store.dispatch('modal/requestCall', true)
    }
  }
}
</script>
<style lang="scss" scoped>
  .header_mobile {
    position: fixed;
    width: 100px;
    width: 100%;
    height: 60px;
    background-color: #ce252b;
    display: flex;
    box-sizing: border-box;
    z-index: 10;

    @media (min-width: 1041px) {
      display: none;
    }

    &-menu {
      height: 100vh;
       background-color: #b12a2f;
      position: fixed;
      z-index: 10;
      width: calc(100% - 70px);
      left: -100%;
      transition: all 0.5s ease 0s;

      &-block {
        overflow: auto;
        height: calc(100% - 80px);
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none; 

        &::-webkit-scrollbar { width: 0; }
      }

      &-active {
        left: 0;
      }
      
      &-header {
        height: 60px;
        padding-left: 10px;
        color: #fff;
        display: flex;
        align-content: center;
      }

      &-close {
        display: flex;
        align-items: center;

        .material-icons {
          font-size: 35px;
          display: flex;
          align-items: center;
        }
      }

      &-user {
        display: flex;
        background-color: #dde3e7;
        width: 100%;
        box-sizing: border-box;
        height: 40px;
        justify-content: left;
        padding-left: 20px;
        cursor: pointer;

        .user {
          display: flex;
          align-items: center;

          &_icon {
            display: flex;
            width: 22px;
            margin-right: 10px;

            img {
              width: 100%;
            }
          }
        }
      }

      &-list {
        padding: 0 20px;
        padding-bottom: 20px;

        &-item {
          height: 40px;
          color: #fff;
          border-bottom: 1px solid #e17272;

          a {
            text-decoration: none;
            color: #fff;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;

            &:hover {
              background-color: #ce252b;
            }
          }

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
    
    &-block {
      display: flex;
      width: 100%;
      padding: 0 10px;
       box-sizing: border-box;
    }
    
    .right {
      display: flex;
      align-items: center;
      margin-left: auto;
      z-index: 10;

      &_cart {
        width: 40px;
        padding: 0 10px;

        

        &-counter {
          width: 25px;
          height: 25px;
          border-radius: 50px;
          background-color: #fff;
          position: absolute;
          margin-top: -45px;
          margin-left: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #b12a2f;

          @media (max-width: 410px) {
            width: 20px;
            height: 20px;
            margin-top: -40px;
          }
        }

        img {
          width: 35px;

          @media (max-width: 410px) {
            width: 30px
          }
        }
      }

      .icons {
        font-size: 35px;
        color:#f78f78;
        padding:  0 5px;

        @media (max-width: 410px) {
          font-size: 30px
        }
      }

      &_heart {
        
      
      }
    }

    .left {
      width: 55px;
      display: flex;
      align-items: center;
      height: 100%;
      line-height: 1px;
      
      &_title {
        font-size: 25px;
        color: #fff;
        z-index: 10;

        @media (max-width: 410px) {
          font-size: 20px;
        }

        @media (max-width: 380px) {
          font-size: 18px;
          margin-left: -10px;
        }

        @media (max-width: 350px) {
          font-size: 16px;
          margin-left: -15px;
        }

      }

      &_menu {
        margin-right: 20px;

        .burger_icon {
          font-size: 40px !important;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }

  .search_mobile-block {
    max-height: 0;
    overflow: hidden;
    width: 100%; 
    box-sizing: border-box;
    position: absolute;
    transition: max-height 0.3s ease-out;
    background-color: #ce252b;
    z-index: 12;
    padding: 0 10px;

    &-active {
      display: block !important;
      transition: max-height 0.3s ease-in;
      max-height: 60px;
    }

    &-input {
      padding: 0 10px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 40px;
      margin-top: 10px;
      font-size: 16px;
      border: none;
      border-radius: 10px;
      outline: none;
      color: #1f1f1f;
    }

    &-close {
      position: absolute;
      right: 0;
      top: 0;
      margin-top: 15px;
      margin-right: 15px;
      font-size: 30px;
      cursor: pointer;
    }
  }

  .search_list {
    margin-top: 22px;
    z-index: 13;
  }
</style>