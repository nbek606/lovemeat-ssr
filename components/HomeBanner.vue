<template>
  <div class="home_banner">
     <Slider
      :images="images"
    />
  </div>
</template>
<script>

import Slider from './Slider.vue'

export default {
  name:'HomeBanner',
  components: { Slider },
  data () {
    return {
      images: [
        {
          name: 'banner',
          src: {
            mobile: "banner_mobile.png",
            desktop: 'banner.png'
          },
          show: true,
          isTitle: true,
          title: {
            top: 'Бесплатная доставка по г.Москва и г.Химки при заказе от 3000 руб.',
            bottom: 'Домашнее мясо высшего качества с собственного подсобного хозяйства'
          }
        },
        {
          name: 'bonus',
          src: {
            mobile: "bonus_mobile.png",
            desktop: 'present.png'
          },
          show: false,
          isTitle: false
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .home_banner {
    width: 100%;
    min-height: 200px;
    position: relative;
    padding: 0;
    box-sizing: border-box;
  }
</style>