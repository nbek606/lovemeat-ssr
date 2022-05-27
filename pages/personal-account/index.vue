<template>
  <div class="content_layout personal_account">
    <Breadcrumbs 
      :list="breadcrumbs"
    />
    <PersonalAccountAuth
      v-if="!accountToken"
    />
    <PersonalAccountPage 
      v-else
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import PersonalAccountAuth from '@/components/PersonalAccountAuth.vue'
import PersonalAccountPage from '@/components/PersonalAccountPage.vue'
import { RouteName } from '@/router/utils'

export default {
  name: 'PersonalAccount',
  components: { 
    PersonalAccountAuth, 
    PersonalAccountPage,
    Breadcrumbs 
  },

  data () {
    return {
      user: true
    }
  },
  mounted () {
    this.$productService.scrollPageTop('scroll_top')
  },
   //метаданные
  head () {
    return {
      title: 'Личный кабинет'
    }
  },
  computed: {
    ...mapGetters({
      accountToken: 'account/getAccountToken',
    }),
    breadcrumbs () {
      return  [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: 'Личный кабинет'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .personal_account {
    padding: 0 30px;
    min-height: 500px;

  }
</style>