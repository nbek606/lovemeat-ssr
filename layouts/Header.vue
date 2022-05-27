<template>
  <div class="header">
    <!--Десктоп-->
    <HeaderDesktop 
      :menu-list="menuList"
    />
    <!--Мобильная версия-->
    <HeaderMobile
      :menu-list="menuList"
    />
  </div>
</template>
<script>

/* import components */
import HeaderDesktop from './HeaderDesktop.vue'
import HeaderMobile from './HeaderMobile.vue'

export default {
  components: {
    HeaderDesktop,
    HeaderMobile
  },
  computed: {
    menuList () {
      return this.$jsonService.menu
    }
  },
  methods: {
    getHandle (url) {
      return url.split('/')[2]
    }
  }
}
</script>
<style lang="scss" scoped>
  .header {
    width: 100%;
  }
</style>