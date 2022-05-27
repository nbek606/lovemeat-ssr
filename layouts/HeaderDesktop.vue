<template>
    <div class="header_desktop">
      <div class="header_desktop-top" id="header_desktop-top">
          <div 
            v-for="item in menuList.data"
            :key="item.id"
            class="header_desktop-top-title"
            :class="item.icon"
          >
            <span class="icon">
              <img
                :src="require(`@/assets/icons/png/${item.icon}.png`)" 
              />
            </span>
            <a
               v-if="item.url"
               class="contacts_item-title"
               :href="item.url"
            >
              {{ item.title }}
            </a>
            <span v-else>
              {{ item.title }}
            </span>
          </div>
          <CallBackButton />
      </div>
      <div class="header_desktop-bottom  content_layout">
        <div 
          class="logo"
          @click="send"
        >
          <img  :src="require(`@/assets/icons/png/logo.png`)" />
          <div class="logo_text">
            <span class="logo_text-title">
              Интернет-магазин мяса и птицы
            </span>
          </div>
        </div>
        <div class="menu">
          <div class="menu_nav"> 
            <div 
              v-for="(item, index) in menuList.nav"
              :key="index"
              class="menu_nav-title"
              @click="sendPage(item.url)"
            >
              {{ item.title }}
            </div>
            <div class="menu_nav-user">
              <div class="fave_counter">
                <span 
                  class="material-icons fave_counter-icon"
                  @click="sendPage('Favorite')"
                >
                  favorite_border
                </span>
              </div>
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
          </div>
          <div class="search-cart">
            <Search />
            <Cart />
          </div>
        </div>
      </div>
    </div>
</template>
<script>

/* import components */
import Search from './Search.vue'
import Cart from './Cart.vue'
import { RouteName } from '@/router/utils'
import CallBackButton from '@/components/CallBackButton.vue'

export default {
  name: 'HeaderDesktop',
  components: {
    Search,
    Cart,
    CallBackButton
  },

  props: {
    menuList: {
      type: [Array, Object],
      required: true
    }
  },
  methods: {
    send () {
      this.$router.push({
        name: RouteName.Home
      })
    },
    sendPage (name) {
      this.$router.push({
        name: RouteName[name]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .header_desktop {
    display: flex;
    flex-direction: column;

    @media (max-width: 1041px) {
      display: none;
    }

      
    &-top {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        background-color: #f0f0f0;
        padding: 5px 30px;
        font-size: 16px;
        box-sizing: border-box;

        &-title {
          width: calc(33% - 70px);
          display: flex;
          align-items: center;

          .icon {
            margin-right:5px;
            width: 22px;
            display: flex;
            align-items: center;
          }

          a {
            text-decoration: none;
            color: #000000;
            transition: all 0.5s;

            &:hover {
              color: #810c0c;
            }
          }
        }
      }

    img {
      width: 100%;
    }

    .request-call {
      border: 2px solid #b12a2f;
      box-sizing: border-box;
      border-radius: 5px;
      padding: 6px 15px;
      text-align: center;
      max-width: 210px;
      justify-content: center;
      cursor: pointer;
      margin-left: auto;
    } 

    &-bottom {
      display: flex;
    }
  }

  .search-cart {
    display: flex;
    margin-top: 20px;
    justify-content: center;


    @media (max-width: 1260px) {
      margin-bottom: 30px;
    }
  }
  
  .logo {
    max-width: 200px;
    cursor: pointer;
    padding-top: 10px;

    &_text {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 0 20px;
      font-weight: 600;
      font-size: 14px;

      &-title {
       color:#89413b;
      }
    }
  }

  .menu {
    width: 100%;

    &_nav {
      display: flex;
      color:#89413b;
      padding: 20px 30px;

      @media (max-width: 1260px) {
        flex-wrap: wrap;
      }

      &-user {
        display: flex;
        margin-left: auto;

        @media (max-width: 1260px) {
          margin-top: 40px;
        }

        .fave_counter {
          border: 2px solid #89413b;
          border-radius: 50px;
          width: 19px;
          height: 19px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
 
         
          &-icon {
            font-size: 19px;
            line-height: 22px;
            cursor: pointer;
          }
        }
        
        .user {
          display: flex;
          align-items: center;
          padding-left: 23px;
          cursor: pointer;

          &_icon {
            display: flex;
            width: 22px;
            margin-right: 10px;
          }
        }
      }

      &-title {
        margin-right: 40px;
        cursor: pointer;
        transition: all 1s 0s ease;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>