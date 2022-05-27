<template>
  <div class="footer">
      <div class="footer_top content_layout">
        <div class="footer_top-logo">
          <img :src="require('@/assets/icons/png/logo.png')" />
        </div>
        <div class="footer_top-contacts">
          <div
            v-for="(item, index) in phones"
            :key="index"
            class="contacts_item"
          >
            <img 
              class="contacts_item-icon"
              :src="require(`@/assets/icons/png/${ item.icon }.png`)"
            />
            <a
              v-if="item.url"
              class="contacts_item-title"
              :href="item.url"
            >
              {{ item.title }}
            </a>
            
            <span 
              class="contacts_item-title"
              v-else
            >
              {{ item.title }}
            </span>
          </div>

          <div
            class="socials"
          >
              <a 
                class="socials_item"
                v-for="(item, index) in social"
                :key="index"
                :href="item.url"
              >
                <img 
                  class="contacts_item-icon"
                  :src="require(`@/assets/icons/png/${ item.icon }.png`)"
                />
              </a>
          </div>
        </div>
        <div class="callback">
          <CallBackButton />
        </div>
      </div>
      <div class="footer_bottom">
        <div class="footer_bottom-table content_layout">
          <div 
            class="footer_bottom-columun"
            v-for="(item, index) in listCategory"
            :key="index"
          >
            <div 
              class="footer_bottom-row"
              v-for="(row, index) in item"
              :key="index"
              @click="sendPageCategory(row)"
            >
                {{ row.name }}
            </div>
          </div>
          <!--nav menu-->
          <div 
            class="footer_bottom-columun"
            v-for="(item, index) in listNavMenu"
            :key="index + columunCategory"
          >
            <div 
              class="footer_bottom-row"
              v-for="(row, index) in item"
              :key="index"
              @click="sendPageNavMenu(row)"
            >
                <a>{{ row.title }}</a>
            </div>
          </div>
        </div>
        <div class="footer_bottom-pk">
          <div class="footer_bottom-pk-data">
            © 2013-2022 "LoveMeat.ru"
          </div>
          <div 
            class="footer_bottom-pk-link"
            @click="sendPolicyPage"
          >
            Политика конфиденциальности
          </div>
        </div>
      </div>
  </div>
</template>
<script>
/* import components */
import CallBackButton from '@/components/CallBackButton.vue'
import { RouteName } from '@/router/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  components: {
    CallBackButton
  },
  data () {
    return {
      columunCategory: 3,
      columunNavMenu: 2
    }
  },
  computed: {
    ...mapGetters({
      getCategories: 'product/getCategories'
    }),
    contacts () {
      const list = []
      const contacts = ['whatsapp', 'instagram', 'phone']
     
      Object.keys(this.$jsonService.contacts).forEach(item => {
        const contact = this.$jsonService.contacts[item]
      
        if (contacts.includes(contact.name)) {
          list.push(contact)
        }
      })

      return list
    },
    footerData () {
      return  this.$jsonService.footer
    },
    //Разделяем список категории на части
    listCategory () {
      if (!this.getCategories) {
        return false
      }
      return this.getList(this.getCategories, this.columunCategory)
    },
    //Разделяем список меню на части
    listNavMenu () {
      return this.getList(this.$jsonService.menu.nav, this.columunNavMenu)
    },

    phones () {
      return this.contacts.filter(item => item.title != undefined)
    },

    social () {
      return this.contacts.filter(item => item.title == undefined)
    }
  },
  methods: {
    sendPolicyPage () {
      this.$productService.scrollPageTop('scroll_top')
      this.$router.push({
        name: RouteName.PrivacyPolicy
      })
    },
    getList (list, columun) {
      const sliceList = []
      const countInColumun = list.length / columun
      let startData = 0
 
      for (let i = 0; i < columun; i++) {
        sliceList[i] = list.slice(startData, startData + countInColumun)
        startData += countInColumun
      }
      
      return sliceList
    },

    sendPageCategory(category) {
        this.$productService.scrollPageTop('scroll_top')
        this.$router.push({
          name: RouteName. CollectionByCategory,
          params: {
            slug: category.slug
          }
        })
    },

    sendPageNavMenu (menuItem) {   
      this.$productService.scrollPageTop('scroll_top')
      this.$router.push({
        name: RouteName[menuItem.url]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .footer {
    flex: 0 0 auto;

    &_pk {
      text-align: center;
      background-color: #5b3932;


    }
    
    &_bottom {
      background-color: #5b3932;
      padding: 30px;
      color: #f0f0f0;
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      &-pk {
        text-align: center;
        padding-top: 50px;

        &-link {
          font-size: 14px;
          margin-top: 10px;
          text-decoration: underline;
          cursor: pointer;
        }
      }

      &-table {
        display: flex;
        width: 100%;
        justify-content: space-between;

        @media (max-width: 700px) {
          flex-wrap: wrap;
          justify-content: end;
        }
      }
      

      &-columun {
        padding: 0 10px;

        @media (max-width: 700px) {
          width: 50%;
          box-sizing: border-box;
        }
      }

      &-row {
        padding: 5px 0;
        text-decoration: underline;
        cursor: pointer;
        transition: all 0.5s;

        &:hover {
          color: #dde3e7;
        }
      }
    }

    &_top {
      display: flex;
      align-items: center;
      padding: 30px;

      @media (max-width: 1024px) {
          flex-direction:column;
      }

      @media (max-width: 1024px) {
        flex-direction:column;
      }

      &-logo {
        width: 150px;

        img {
          width: 100%;
        }
      }

      .socials {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 50px;
        padding: 10px 0;

         @media (max-width: 765px) {
           margin-right: 0;
         }
      }
      
      &-contacts {
        display: flex;
        width: 100%;
        justify-content: space-between;

        @media (max-width: 1024px) {
          padding: 30px 0;
        }

        @media (max-width: 765px) {
          flex-direction: column;
        }

        .contacts_item {
          display: flex;
          padding: 0 5%;
          align-items: center;

          @media (max-width: 765px) {
            padding: 10px 0;
            justify-content: center;
          }


          &-icon {
            width: 25px;
            height: 25px;
            margin-right: 5px;
          }

          &-title {
             text-decoration: none;
             color: #000000;
             transition: all 0.5s;

             &:hover {
               color: #810c0c;
             }
          }
        }
      }
    }
  }

  .hide {
    display: none;
  }
</style>