<template>
  <div class="product" id="product">
    <div v-if="product != undefined">
      <div class="content_layout">
        <ProductItem
          :product="product"
        />
      </div>
      <RibbonAbout
        :list="$jsonService.ribbonAbout.afterProductItem"
      />
      <div class="product_similar content_layout">
        <h1 class="global_title">
          Похожие товары
        </h1>
        <ProductList
          v-if="randomList"
          :list="randomList.product"
          :max="4"
        />
      </div>
    </div>
    <div class="undefined" v-else>
      <PageNotFound />
    </div>
  </div>
</template>
<script>

/* import components */
import ProductItem from '@/components/ProductItem.vue'
import ProductList from '@/components/ProductList.vue'
import RibbonAbout from '@/components/RibbonAbout.vue'

import { mapGetters } from 'vuex'
import PageNotFound from '@/components/PageNotFound.vue'

export default {
  name: 'Product',
  provide: {
    page: 'all'
  },
  components: {
    ProductItem,
    ProductList,
    RibbonAbout,
    PageNotFound
  },
  mounted () {
    this.getProduct(this.$route.params.slug)
    this.$productService.scrollPageTop('scroll_top')
  },

  //метаданные
  head () {
    if(this.product) {
      return {
        title: this.product.yoast_head_json.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.product.yoast_head_json.description
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: this.product.yoast_head_json.og_description
          }
        ]
      }
    }
  },

  data () {
    return {
      product: false,
      categoryId: 0,
      productListByCategory: {
        product: [],
        category: {}
      }
    }
  },

  watch: {
    $route () {
      this.getProduct(this.$route.params.slug)
      this.$productService.scrollPageTop('scroll_top')
      this.product = false
    }
  },
  //метаданные
  metaInfo() {
    if (this.product) {
      return {
        title: this.product.yoast_head_json.title,
        meta: [{
          description: this.product.yoast_head_json.description
        }]
      }
    }
  },

  computed: {
    ...mapGetters({
      getGlobalProduct: 'product/getGlobalProduct', 
      getProductList: 'product/getProductList', 
      getUnderProductList: 'product/getUnderProductList'
    }),
    randomList () {    
      if (!this.product) {
        false
      }

      const list = this.productListByCategory
  
      if (!list) {
        return false
      }

      //Рандомно выбираем продукт
      list.product = list.product.sort(function(){
        return Math.random() - 0.5;
      });

      return list
    }
  },

  methods: {
    getProduct (productSlug) {
      const itemProduct = this.getProductList.find(item => item.slug == productSlug)

      if (itemProduct) {
        this.product = this.$productService.cloneObject(itemProduct)
        this.getListByCategory()
      }

      this.$productApiService.getProductBySlug(productSlug).then((response) => {
        this.product = response.data.find(item => item.slug == productSlug)
        const saveData = this.$productService.cloneObject(this.product)
        this.$store.dispatch('product/productList', saveData)

        this.getListByCategory()
      })
    },

    getListByCategory () {
      if (this.product) {

        this.productListByCategory = {
          product: [],
          category: {}
        }
        
        const itemList = this.getUnderProductList.find(item => item.category.id == this.product.categories[0]?.id)
        
        if (itemList) {
          this.productListByCategory.product = itemList.product.filter(item => item.id != this.product.id)
          this.productListByCategory.category = {
            id: this.product.categories[0]?.id
          }

          this.productListByCategory = this.$productService.cloneObject(this.productListByCategory)       
        }

        this.$productApiService.getProductByCategoryId(this.product.categories[0]?.id, 30).then((response) => {
          this.productListByCategory.product = response.data.filter(item => item.id != this.product.id)
      
          this.productListByCategory.category = {
            id: this.product.categories[0]?.id
          }
          
          const saveData = this.$productService.cloneObject(this.productListByCategory)

          this.$store.dispatch('product/underProductList', saveData)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .product {
    min-height: 600px;

    &_similar {
      padding: 0 30px;
      padding-bottom: 30px;
      box-sizing: border-box;
    }
  }

  .undefined {
    padding: 0 30px;
    font-size: 30px;
    font-weight: 600;
    margin: auto;
    text-align: center;
    margin-top: 100px;
  }
</style>