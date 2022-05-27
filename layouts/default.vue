<template>
  <div class="base_layout">
    <Header />
    <Categories />
    <div id="scroll_top">
    </div>
    <div class="base_content">
      <nuxt />
      <!--модалка корзины-->
      <AddToCart />
      <Loader />
      <CallBackModal />
    </div>
    <div class="base_footer">
      <Footer />
    </div>
  </div>
</template>
<script>

/* import components */
import Categories from './Categories.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import AddToCart from '@/components/modal/AddToCart.vue'
import Loader from '@/components/modal/Loader.vue'
import CallBackModal from '@/components/modal/CallBackModal.vue'

export default {
  name: 'BaseLayout',
  components: {
    Categories,
    Header,
    Footer,
    AddToCart,
    Loader,
    CallBackModal
  }
}
</script>
<style lang="scss" scoped>
  .base_layout {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .base_content {
    min-height: 500px;
    position: relative;
    
    @media (max-width: 1040px) {
      margin-top: 60px;
    }
  }
</style>