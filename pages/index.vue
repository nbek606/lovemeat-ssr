<template>
  <div class="home">
    <!--Баннер-->
    <HomeBanner />
    <!--Категория-->  
    <HomeProductByCategoryList
      v-for="(item, index) in sortList"
      :key="index"
      :list="item"
      :max="4"
      :index="index"
    />
    <!--Лента-->
    <RibbonAbout
      :list="$jsonService.ribbonAbout.afterBaranina"
    />
    <BasePage>
      <!--Рецепты-->
      <HomeRecipesWidget />
      <hr/>
      <!---Блог-->
      <HomeBlogWidget />
    </BasePage>
    <!--Отзыв-->
    <HomeReviewWidget />
  </div>
</template>
<script>
/* import components */
import HomeBanner from '@/components/HomeBanner.vue'
import HomeProductByCategoryList from '@/components/HomeProductByCategoryList.vue'
import RibbonAbout from '@/components/RibbonAbout.vue'
import HomeRecipesWidget from '@/components/HomeRecipesWidget.vue'
import HomeBlogWidget from '@/components/HomeBlogWidget.vue'
import HomeReviewWidget from '@/components/HomeReviewWidget.vue'
import BasePage from '@/components/BasePage.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'index',
  components: {
    HomeBanner,
    HomeProductByCategoryList,
    RibbonAbout,
    HomeRecipesWidget,
    HomeBlogWidget,
    HomeReviewWidget,
    BasePage
  },
  data () {
    return {
      list: false
    }
  },
  mounted () {
    this.$productService.scrollPageTop('header_desktop-top')
    this.getList()
  },
  computed: {
    ...mapGetters({
      getCategories: 'product/getCategories', 
      getGlobalProduct: 'product/getGlobalProduct'
    }),

    listCategory () {
      return  this.getCategories.slice(0, 2)
    },
    sortList () {
      
      const itemList = []
      const max = 4

      if (!this.list) {
         for (let i = 0; i <= max; i++) {
           itemList[i] = []
         }
      } else {
        let startCount = 0

        for (let i = 0; i <= max; i++) {
          const list = this.list.slice(startCount, startCount + max)
          startCount += max
          if (list.length >= 4 ) {
            itemList.push(list)
          }
        }
      }

      return itemList
    } 
  },
  methods: {
    getList () {
      const slug = 'hit'
  
      if (this.getGlobalProduct.length > 0) {
          this.list = this.$productService.cloneArray(this.getGlobalProduct)
      } 
      
      this.$productApiService.getProductTagBySlug(slug).then((response) => {
        const hit = response.data.find(item => item.slug == slug)

        if (hit) {
          this.$productApiService.getProductByTagId(hit.id).then((response) => {
              this.list = response.data
              let saveData =  this.$productService.cloneArray(response.data)
              this.$store.dispatch('product/globalProduct', saveData) 
          })
        }
      })
    },
  },
  //метаданные
  metaInfo() {
      return {
        title: 'Интернет-магазин мяса и птицы',
        meta: [{
          description: 'Интернет-магазин мяса и птицы'
        }]
      }
  },
}
</script>