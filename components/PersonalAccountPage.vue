<template>
  <div class="user">
     <div 
      class="logout"
      @click="logout"
    >
      Выйти
    </div>
    <div class="user_tab">
      <div 
        class="user_tab-item"
        :class="{'user_tab-item-active': activeTab == item.tab }"
        v-for="(item, index) in listTab"
        :key="index"
        @click="changeTab(item.tab)"
      > 
        <img
          class="user_tab-item-img"
          :src="require(`@/assets/icons/png/${item.icon}.png`)"
        />
        <span
          class="user_tab-item-title"
        >
          {{ item.title }}
        </span>
      </div>
    </div>
    <div class="user_tab-conteiner">
      <PersonalAccountPageOrder 
        v-if="activeTab == 'order'"
        :orders="orders"
        :max-page="orderMaxPage"
        :current-page="orderCurrentPage"
        @change-page="changePage"
        @change-status="changeStatus"
      />
      <PersonalAccountPageAddress
        v-if="activeTab == 'address'"
        @edit-address="editAddress"
      />
      <PersonalAccountPageProfile 
        v-if="activeTab == 'profile'"
      />
      <PersonalAccountPageFavorite
        v-if="activeTab == 'favoritee'"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { RouteName } from '@/router/utils'
import PersonalAccountPageAddress from '@/components/PersonalAccountPageAddress.vue'
import PersonalAccountPageFavorite from '@/components/PersonalAccountPageFavorite.vue'
import PersonalAccountPageOrder from '@/components/PersonalAccountPageOrder.vue'
import PersonalAccountPageProfile from '@/components/PersonalAccountPageProfile.vue'

export default {
  components: { 
    PersonalAccountPageOrder, 
    PersonalAccountPageAddress,
    PersonalAccountPageProfile,
    PersonalAccountPageFavorite 
  },

  name: 'PersonalAccountPage',

  data () {
    return {
      activeTab: 'order',
      orders: [],
      orderPerPage: 10,
      orderCurrentPage: 1,
      orderMaxPage: 1,
      listTab: [
        {
          icon: 'clipboard',
          title: 'История заказов',
          tab: 'order'
        },
        {
          icon: 'location',
          title: 'Адрес доставки',
          tab: 'address'
        },
        {
          icon: 'profile',
          title: 'Профиль',
          tab: 'profile'
        },
        {
          icon: 'favorite',
          title: 'Избранное',
          tab: 'favorite'
        }
      ]
    }
  },
  mounted () {
    this.getOrder()
  },
  computed: {
    ...mapGetters({
      account: 'account/getAccountData'
    })
  },
  methods: {
    changeStatus(data) {
      this.orders.forEach(item => {
        if (item.id == data.id) {
          item.status = data.status
        }
      })
    },
    changePage (page) {
      this.orderCurrentPage = page,
      this.getOrder()
    },
    changeTab (tab) {
      this.activeTab = tab

      if (tab == 'favorite') {
        this.$router.push({
          name: RouteName.Favorite
        })
      }
    },
    getOrder () {
      this.$store.dispatch('modal/LOADER_ON')
      this.$orderApiService.getOrderByAccount(this.account.id, this.orderCurrentPage, this.orderPerPage).then((response) => {
        this.orders = response.data
        this.orderMaxPage = response.headers['x-wp-totalpages']
        this.$store.dispatch('modal/LOADER_OFF')
      })
    },
    logout () {
      this.$store.dispatch('account/logout')
    },
    editAddress () {
      this.activeTab = 'profile'
    }
  }
}
</script>
<style lang="scss" scoped>
  .user {
    min-height: 500px;
    &_tab {
      display: flex;
      
      @media (max-width: 650px) {
        flex-direction: column;
      }

      &-item {
        border: 1px solid #7b7b7b;
        border-left: none;
        padding: 10px 20px;
        background-color: #e9e9e9;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-weight: 500;

        @media (max-width: 650px) {
          border: 1px solid #7b7b7b;
          border-top: 0;
          
          &:first-child {
            border-top: 1px solid #7b7b7b;

          }
        }

        &-active {
          background-color: #fff;
          font-weight: 500;
        }

        &-img {
          width: 20px;
          height: 20px;

          margin-right: 5px;
        }

        &-active {
          color: #b12a2f;
        }

        &:first-child {
          border-left: 1px solid #7b7b7b;
        }
      }
    }
  }

  img {
    width: 100%;
  }

  .logout {
    margin-left: auto;
    background-color: #b12a2f;
    color: #fff;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0 30px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.5s;
    max-width: 100px;
    padding: 10px 0;
    margin-bottom: 20px;

    @media (max-width: 650px) {
      margin-left: 0;
    }

    &:hover {
      letter-spacing: 1px;
    }
  }
</style>