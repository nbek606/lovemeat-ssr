<template>
  <div 
    class="list_item"
    :class="{'list_item-fourth': page && page == 'collections' }"
  >
    <div class="list_item-top">
      <div 
        class="list_item-img"
      >
        <img 
          @click="sendProduct(product.slug)"
          v-if="product.images[imageIndex]"
          :src="$productService.generateImg(product.images[imageIndex].src, '300')" 
        />
        <img 
          v-else
          src="@/assets/icons/png/no-photo.png"
        />
    
        <div class="elected">
          <span 
            class="material-icons elected-icon"
            v-if="!isFavorite"
            @click="sendFavorite"
          >
            favorite_border
          </span>
          <span
            v-else 
            class="material-icons elected-icon"
            @click="sendFavorite"
          >
            favorite
          </span>
        </div>
        <div class="sale_hit">
          <div 
            class="sale"
            v-if="product.on_sale"
          >
            <span class="sale_value">{{ salePercent }}</span>
            <span class="sale_char">%</span>
          </div>
          <div 
            class="hit"
            v-if="hit"
          >
            Хит
          </div>
          <div 
            class="product_of-day"
            v-if="productOfDay"
          >
            Товар дня
          </div>
        </div>
      </div>
      <div class="list_item-carousel">
        <div
          class="list_item-carousel-item"
          :class="{ active: imageIndex === index}"
          v-for="(item, index) in product.images.slice(0, 5)"
          :key="index"
          @click="switchImage(index)"
        >
        </div>
      </div>
      <div 
        class="list_item-title"
        @click="sendProduct(product.slug)"
      >
         {{ product.name }}
      </div>
       <div class="list_item-counter">
         <div 
          class="minus"
          :class="{ disabled : minButtonDisabled }"
          @click="changeWeight(-sinfulness)"
        >
           __
         </div>
         <div class="weight">
           <span v-if="saleType == 'kg'">
            {{ weight }} кг
           </span>
          <span v-else>
            {{ weight }} шт
           </span>
         </div>
         <div
          class="plus"
          @click="changeWeight(sinfulness)"
         >
          +
         </div>
       </div>
    </div>
 
    <div class="list_item-bottom">
      <div 
        class="list_item-price list_item-price-sale"
        v-if="product.on_sale"
      >
        <span class="price_nosale">
          {{  saleSum  }}
        </span>
        <span class="price_sale">
          {{ sum }}
        </span>
      </div>
      <div 
        class="list_item-price list_item-price-nosale"
        v-else
      >
         {{ sum }}
      </div>
      <div 
        class="list_item-cart-button"
        @click="addCart"
      >
        В корзину
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { RouteName } from '../router/utils'

export default {
  name: 'ProductListItem',
  inject: ['page'],
  props: {
    product: {
      type: [Object, Array],
      required: true
    },
  },
   
  data () {
    return {
      imageIndex: 0,
      weight: 1,
      sinfulness: 0.1
    }
  },  

  mounted () {
    this.startWeight()
  },

  computed: {
    ...mapGetters({
      favorites: 'favorite/getFavoriteProductList'
    }),

    isFavorite () {
      return this.favorites.find(item => item.id == this.product.id)
    },

    weightControl () {
      return this.$productService.getMinMaxWeight(this.product)
    },

    saleType () {
      return this.$productService.saleType(this.product)?.value 
    },

    salePercent () {
      return this.$productService.salePercent(this.product)
    },

    hit() {
      return this.product.tags.find(item => item.slug == 'hit')
    },

    productOfDay () {
      return this.product.tags.find(item => item.slug == 'product-day')
    },

    minButtonDisabled () {
      return this.weight * 1000 <= Number(this.weightControl.min.value)
    },

    sum () {
       return (Number(this.product.price) * Number(this.weight)).toFixed(0)
    },

    saleSum () {
      return (Number(this.product.regular_price) * Number(this.weight)).toFixed(0)
    },
  },

  methods: {
    addCart () {
      this.$store.dispatch('cart/cartProductList', {
        sum: this.sum,
        weight: this.weight,
        product: this.product,
      }).then(() => {
         this.$store.dispatch('cart/modalAddCart', true)
      })
    },

    sendProduct (slug) {
      this.$router.push({ 
        name:RouteName.Product,
        params: { slug: slug }
      })
    },

    switchImage (index) {
      this.imageIndex = index
    },

    changeWeight(sinfulness) {
      if (this.saleType != 'kg') {
        sinfulness = sinfulness * 10      
      }
      
      this.weight = this.$productService.changeWeight(sinfulness, this.weight)
    },
    sendFavorite () {
      this.$store.dispatch('favorite/favoriteProductList', this.product)
    },
    startWeight () {
      this.weight = 1
    }
  }
}
</script>
<style lang="scss" scoped>
  .list_item {
    display: flex;
    flex-wrap: wrap;
    width: calc(25% - 34px);
    margin-bottom: 45px;


    &:nth-child(1n) {
      margin-right:45px;
    }

    &:nth-child(4n) {
      margin-right:0;
    }

    @media (min-width: 1024px)  and (max-width:1550px){
      width: calc(33% - 27px);

      &:nth-child(1n) {
        margin-right:45px;
      }

       &:nth-child(3n) {
        margin-right:0;
      }

      &:nth-child(4n) {
        display: none;
      }
    }

    @media (max-width: 1024px) {
      width: calc(50% - 22.5px);
      
      &:nth-child(2n) {
        margin-right:0;
      }
    }


    @media (max-width: 765px) {
      width: calc(100%);
      
      &:nth-child(2n + 1) {
        margin-right:0;
      }
    }

    &-top {
      padding: 40px;
      border: 1px solid silver;
      text-align: center;
      width: 100%;

      @media (max-width: 1400px) {
        padding: 20px;
      }

      @media (max-width: 765px) {
        padding: 40px;
      }

      @media (max-width: 450px) {
        padding: 20px;
      }
    }

    &-carousel {
      display: flex;
      justify-content: center;
      padding: 10px;
      height: 20px;

      &-item {
        margin: 0 7px;
        height: 10px;
        width: 10px;
        background-color: #5a5650;
        cursor: pointer;
      }

      .active {
        background-color: #cecece;
      }
    }

    &-counter {
      display: flex;
      margin-top: 30px;
      justify-content: center;
      align-items: center;

      .weight {
        padding: 0 10px;
        font-size: 24px;
        font-weight: 600;
      }

      .minus {
        line-height: 10px;
        font-size: 16px;
        font-weight: 700;
      }

      .plus {
        line-height: 24px;
        font-size: 28px;
        font-weight: 100;
      }

      .plus, .minus {
         width: 27px;
         height: 27px;
         color: #5a5650;
         border: 1px solid #5a5650;
         cursor: pointer;
         display: inline-block;
         text-align: center;
        box-sizing: border-box;
      }
    }

    &-title {
      text-align: center;
      font-size: 17px;
      font-weight: 600;
      text-transform: uppercase;
      color: #000000;
      cursor: pointer;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s;

      &:hover {
        color: #810c0c;
      }
    }

    &-bottom {
      display: flex;
      width: 100%;
      border: 1px solid #b12a2f;
      height: 50px;
    }

    &-price, &-cart-button {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 0;
    }  

    &-price {
      font-size: 20px;
      font-weight: 600;

      &-sale {
        background-color: yellow;

        .price_nosale {
          margin-right: 10px;
          text-decoration: line-through;
        }
      }

      &::after {
        content: "\20BD";
        margin-left: 5px;
      }
    }
    
    &-cart-button {
      background-color: #b12a2f;
      color: #fff;
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.5s ease 0s;

      &:hover {
        background-color: #ce252b;
      }
    }
    &-img {
      position: relative;
      cursor: pointer;
      
      .elected {
        position: absolute;
        top: 0;
        right: 0;
        padding: 1px;
        border: 1px solid #6b6b6b;
        background-color: #fff;
        cursor: pointer;
        box-sizing: border-box;
        height: 33px;
        width: 33px;
        display: flex;
        align-items: center;
        justify-content: center;

        &-icon {
           font-size: 29px;
           color: #b12a2f;
        }
      }

      .sale_hit {
        position: absolute;
        left: 0;
        top: 0;

        .sale {
          background-color: yellow;
          display: inline-block;
          padding: 10px;
          font-size: 20px;
          border: 1px solid #121212;

          &_value {
            font-weight: 700;
          }

          &_char {
            font-size: 16px;
            font-weight: 700;
          }
        }

        .hit {
          color: #fff;
          font-size: 16px;
          padding: 2px 10px;
          text-transform: uppercase;
          font-weight: 600;
          background-color: #008ecf;
        }

        .product_of-day {
          color: #fff;
          font-size: 16px;
          padding: 2px 10px;
          text-transform: uppercase;
          font-weight: 600;
          background-color: #6bc301;
        }
      }
    }
  }

  img {
    width: 100%;
  }

  .list_item-fourth {
    width: calc(25% - 18.8px);

    @media (min-width: 1024px) {
      
      &:nth-child(1n) {
        margin-right:25px;
      }

      &:nth-child(4n) {
        margin-right:0;
        display: flex !important;
      }
    }

    @media (max-width: 1024px) and (min-width: 765px) {
      width: calc(33% - 15px);
      display: flex;
      
      &:nth-child(1n) {
        margin-right:25px;
      }

      &:nth-child(3n) {
        margin-right: 0;
      }     
    }


    @media (max-width: 765px) and (min-width: 600px)  {
      width: calc(50% - 13.5px);
      margin-right: 25px;

      &:nth-child(1n) {
        margin-right:25px;
      }

      &:nth-child(2n) {
        margin-right: 0;
      }
    }


    @media (max-width: 600px) {
      width: 100%;
      margin-right: 0;

      &:nth-child(1n) {
        margin-right:0px;
      }
    }
  }
</style>