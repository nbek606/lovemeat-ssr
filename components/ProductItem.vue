<template>
<div  class="product_item">
  <Breadcrumbs
    v-if="product"
    :list="breadcrumbs()"
  />
  <div v-if="product">
    <h1 class="global_title">{{ product.name }}</h1>
    <div class="product_item-block">
      <div class="product_item-block-left">
        <div class="img_global">
          <div class="img_global-item">
            <img 
              v-if="globalImgSrc"
              :src="globalImgSrc"
            />
            <img 
              v-else-if="product.images[0]"
              :src="$productService.generateImg(product.images[0].src, '450')"
            />
            <img 
              v-else
              src="@/assets/icons/png/no-photo.png"
              class="no_photo"
            />
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
        </div>
        <div 
          class="img_list"
          v-if="product.images.length > 1"
        >
          <div 
            class="img_list-item"
            v-for="img in product.images"
            :key="img.id"
            @click="changeImgSrc(img.src)"
          >
            <img :src="$productService.generateImg(img.src, '150')">
          </div>
        </div>
      </div>
      <!--центральный блок-->
      <div class="block_line"></div>
      <div class="product_item-block-center">
        <div 
          class="favorite_block"
          @click="sendFavorite"
        >
         <span class="material-icons favorite_block-icon">
            {{ favorite.icon}}
          </span>
          <span class="favorite_block-title">
            {{ favorite.text }}
          </span>
        </div>
        <div class="settlement_block">
          <div class="settlement_block-price">
              <span class="settlement_block-price-title">
                Цена:
              </span>
              <span 
                class="settlement_block-price-sale"
                v-if="product.on_sale"
              >
                <span class="price_nosale">
                  {{ product.regular_price }}
                </span>
                <span class="price_sale">
                  {{ product.sale_price }}
                </span>
              </span>
              <span 
                class="settlement_block-price-nosale"
                v-else
              >
                {{ product.price }}
              </span>
              <span v-if="saleType == 'kg'">
                /кг
              </span>
              <span v-else>
                /шт
              </span>
          </div>
          
          <div class="settlement_block-cart">
            <div class="settlement_block-cart-counter">
                <div 
                  class="minus"
                  :class="{ disabled : minButtonDisabled() }"
                  @click="changeWeight(-sinfulness)"
                >
                  __
                </div>

                <div class="weight">
                    {{ weight }}
                    <span v-if="saleType == 'kg'">
                        кг
                    </span>
                    <span v-else>
                        шт
                    </span>
                </div>
                <div
                  class="plus"
                  @click="changeWeight(sinfulness)"
                >
                  +
                </div>
              </div>
            <div 
              class="settlement_block-cart-button"
              @click="addCart"
            >
              В корзину
            </div>
          </div>
          <div class="settlement_block-sum">
            <span class="settlement_block-sum-title">
              Итого:
            </span>
            <span class="settlement_block-sum-price">
              {{ allSum }}
            </span>
          </div>
        </div>

        <!--свойства-->
        <div class="properties">
          <!---ккалорий-->
          <div class="properties_kcal">
            <div 
              class="properties_kcal-title"
              v-if="properties.kdj.value || properties.kkal.value"
            >
              Энергетическая ценность (КБЖУ) в 100 гр.продукта
            </div>
            <div 
              class="properties_kcal-value" 
              v-if="properties.kdj.value || properties.kkal.value"
            >
              <span class="properties_kcal-value-text">
                <span v-if="properties.kkal.value">
                  {{ properties.kkal.value }}
                  Ккал / 
                </span> 
                <span v-if="properties.kdj.value">  
                    {{  properties.kdj.value}} Кдж 
                  </span>
              </span>
            </div>
          </div>
          <!--список своств-->
          <div class="properties_compound-list">
            <div 
              class="properties_compound-list-item"
              v-for="(item, index) in getProperties"
              :key="index"
            >
              <span v-if="item.isValue"> 
                <span class="title">
                  {{ item.title }}
                </span>
                <span class="value">
                  {{ item.value }}
                </span>
              </span>
            </div>
          </div>          
        </div>
      </div>
      <div class="block_line"></div>
    </div>
     <!--опции-->
    <div class="product_item-block-option">
        <div class="options" v-if="properties.cookingMethods">
          <div 
            class="options_item"
            v-for="(item, index) in properties.cookingMethods.options"
            :key="index"
          >
            <img :src="require('@/assets/icons/png/select.png')" />
            <span class="options_item-title">
              {{ item }}
            </span>
          </div>
        </div>
    </div>

    <div class="product_item-tab">
      <div class="tab-container">
        <div 
          class="tab-container-item"
        >
          <span v-html="product.description" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Breadcrumbs
      :list="breadcrumbsDefault"
    />
    <ProductMaket />
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'

/* import components */
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import { RouteName } from '@/router/utils'
import ProductMaket from './ProductMaket.vue'

export default {
  name: 'ProductItem',
  props: {
    product: {
      type: [Object, Array, Boolean],
      required: true
    }
  },
  components: {
    Breadcrumbs,
    ProductMaket
  },
  data () {
    return {
      globalImgSrc: false,
      weight: 1,
      sinfulness: 0.1,
      itemTab: 'description',
      breadcrumbsDefault: [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: "Продукт"
        }
      ]
    }
  },
  mounted () {
    this.weight = 1
  },

  computed: {
    ...mapGetters({
      favorites: 'favorite/getFavoriteProductList'
    }),

    saleType () {
      return this.$productService.saleType(this.product)?.value 
    },

    isFavorite () {
      return this.favorites.find(item => item.id == this.product.id)
    },

    productOfDay () {
      return this.product.tags.find(item => item.slug == 'product-day')
    },

    favorite () {

      let favorite  = {}  

      if (this.isFavorite) {
          favorite = { 
            icon : 'favorite', 
            text: 'Удалить из Избранное' 
          } 
      } else { 
          favorite = { 
            icon : 'favorite_border', 
            text: 'Добавить в Избранное'
          } 
      }

      return favorite
    },

    allSum () {
      const allSum = +this.product.price * this.weight
      return allSum.toFixed(0)
    },

    weightControl () {
      return this.$productService.getMinMaxWeight(this.product)
    },

    properties () {
      return {
        protein: this.product.meta_data.find(item => item.key == 'protein'),
        fat: this.product.meta_data.find(item => item.key == 'fat'),
        carbo: this.product.meta_data.find(item => item.key == 'carbo'),
        storage: this.product.meta_data.find(item => item.key == 'storage_temp'),
        cookingMethods: this.product.attributes.find(item => item.name == 'сooking-methods'),
        kdj: this.product.meta_data.find(item => item.key == 'kdj'),
        kkal: this.product.meta_data.find(item => item.key == 'kkal')
      }
    },
    getProperties () {
      return [
        {
          title: 'Белки:',
          value: `${this.properties.protein.value} г`,
          isValue: this.properties.protein.value ? true: false
        },
        {
          title: 'Жиры:',
          value: `${this.properties.fat.value} г`,
          isValue: this.properties.fat.value ? true: false
        },
        {
          title: 'Условия хранения:',
          value: `${this.properties.storage.value == 'one' ? 'от 0 до +4' : this.properties.storage.value }`,
          isValue:  this.properties.storage.value ? true: false
        },
        {
          title: 'Минимальный вес:',
          value: this.saleType == 'kg' ? `от ${this.weightControl.min.value / 1000} кг` : ``,
          isValue:  this.weightControl.min.value ? true: false
        },
      ]
    },
    salePercent () {
      return this.productService.salePercent(this.product)
    },
    hit() {
      return this.product.tags.find(item => item.slug == 'hit')
    }
  },
  methods: {
    breadcrumbs () {
      if (!this.product) {
        return false
      }

      return  [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: this.product.categories[0]?.name ,
          url: RouteName.CollectionByCategory,
          params: { slug: this.product.categories[0]?.slug }
        },
        {
          title: this.product.name
        }
      ]
    },

    changeImgSrc (src) {
      this.globalImgSrc = src
    },

    changeWeight (sinfulness) {
       if (this.saleType != 'kg') {
        sinfulness = sinfulness * 10      
      }
      
      this.weight = this.productService.changeWeight(sinfulness, this.weight)
    },

    minButtonDisabled () {
      return this.weight * 1000 <= Number(this.weightControl.min.value)
    },

    addCart () {
      this.$store.dispatch('cartProductList', {
        sum: +this.allSum,
        weight: +this.weight,
        product: this.product,
      }).then(() => {
         this.$store.dispatch('modalAddCart', true)
      })
    },

    sendFavorite () {
      this.$store.dispatch('favorite/favoriteProductList', this.product)
    },

    changeTab (tab) {
      this.itemTab = tab
    }
  }
}
</script>
<style lang="scss" scoped>
  .product_item {
    padding: 0 30px;

    &-tab {
      padding-bottom: 150px;

      .tab {
        &-item {
            border: 1px solid silver;
            display: inline-block;
            padding: 5px 30px;
            margin-right: 10px;
            font-size: 20px;
            border-bottom: 2px solid silver;
            cursor: pointer;

            @media (max-width: 380px) {
              padding: 5px 15px;
            }
        }

        .tab_active {
          border-color: #b12a2f !important;
          color: #b12a2f !important;
        }
      }
    }

    @media(max-width:800px) {
      padding: 0 15px;
    }

    &-block {
      display: flex;

      @media(max-width:800px) {
        flex-direction: column;
      }

      &-option {
        display: flex;
        padding: 20px 0;
        
        .options {
          display: flex;
          flex-wrap: wrap;
          &_item {
            display: flex;
            font-weight: 500;
            align-items: center;
            margin-right: 20px;

            &-title {
              align-items: center;
              display: flex;
              line-height: 35px;
            }

            img {
              margin-right: 10px;
              width: 20px;
              height: 20px;
            }
          }
        }
      }

      &-center {
        padding: 0 30px;

        @media(max-width:800px) {
          padding: 0;
        }

        .favorite_block {
            display: flex;
            align-items: center;
            padding-bottom: 20px;
            cursor: pointer;

            &-icon {
              margin-right: 10px;
              color: #b12a2f;
            }

            &-text {
              font-size: 16px;
            }
        }

        .properties {
          padding-top: 20px;
          
          &_kcal {
         
            &-value {
              padding: 15px 0;
              display: flex;
              align-items: center;
              font-size: 16px;

              &-img {
                width: 40px;
                height: 40px;
              }

              &-text {
                font-weight: 500;
              }
            }
          } 

          &_compound {
            padding: 20px 0;
            .title {
             
            }
            .value {
              font-weight: 600;
            }
          }

          &_compound-list {

            &-item {
              display: flex;
              padding: 5px 0;

              .title {
                margin-right: 10px;
              }
            }
          }
        }

        .settlement_block {
          border: 1px solid #7e7e7e;
          padding: 30px;
          display: inline-block;

          &-sum {
            font-size: 20px;
            font-weight: 600;
            margin-top: 20px;

            &-price {
              &::after {
                content: "\20BD";
                margin-left: 5px;
              }
            }

            &-title {
              font-weight: 500;
              color: #7e7e7e;
            }
          }

          &-cart {
            display: flex;
            align-items: center;
            margin-top: 20px;

            @media (max-width: 1150px) {
              flex-direction: column;
              display: block;
            }

            &-button {
              background-color: #b12a2f;
              display: inline-block;
              color: #fff;
              height: 35px;
              padding: 0 20px;
              line-height: 35px;
              font-size: 18px;
              cursor: pointer;
              transition: all 0.5s;
              min-width: 100px;
              text-align: center;

              &:hover {
                background-color: #5b3932;
              }

              @media (max-width: 1150px) {
                margin-top: 20px;
              }
            }

            &-counter {
              display: flex;
              margin-right: 10px;
              justify-content: center;
              align-items: center;

              @media(max-width:1150px) {
                justify-content: start;
              }

              .weight {
                padding: 0 10px;
                font-size: 22px;
                font-weight: 600;
                min-width: 70px;
                text-align: center;
              }

              .minus {
                line-height: 8px;
                font-size: 20px;
                font-weight: 700;
              }

              .plus {
                line-height: 25px;
                font-size: 35px;
                font-weight: 100;
              }

              .plus, .minus {
                width: 28px;
                height: 28px;
                color: #5a5650;
                border: 1px solid #5a5650;
                cursor: pointer;
                display: inline-block;
                text-align: center;
                box-sizing: border-box;
              }

              .disabled {
                background-color: #f0f0f0;
                pointer-events: none;
                cursor: default;
              }
            }
          }
    
          &-price {
            font-size: 20px;
            font-weight: 600;
            
            &-sale {
              .price_sale {
                background-color: yellow;
                font-size: 25px;
                font-weight: 600;
                text-align: center;
                padding: 5px;
                display: inline-block;

                &::after {
                  content: "\20BD";
                  margin-left: 5px;
                }
              }

              .price_nosale {
                font-size: 20px;
                font-weight: 600;
                text-decoration: line-through;
                padding: 0 10px;
                text-decoration-color:#b12a2f;
              }
            }

            &-nosale {
              &::after {
                content: "\20BD";
                margin-left: 5px;
              }
            }

            &-title {
              font-weight: 500;
              color: #7e7e7e;
            }
          }
        }
      }

      &-left {
        width: auto;

        @media(max-width:1150px) {
           width: 50%;
        }

        @media(max-width:1024px) {
           width: 60%;
        }

        @media (max-width: 800px) {
          width: 100%;
        }

        .img_global {
          width: 100%;
          position: relative;

          img {
            width: 100%;
            max-width: 450px;
          }

          .no_photo {
            padding: 80px;
            box-sizing: border-box;
            border: 1px solid #7e7e7e;

            @media (max-width: 400px) {
              padding: 60px;
            }

            @media (max-width: 350px) {
              padding: 40px;
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
          }
        }
        
        .img_list {
            overflow-x: auto;
            white-space: nowrap;
            -ms-overflow-style: none;
            overflow: -moz-scrollbars-none;
            &::-webkit-scrollbar { width: 0 }


        &-item {
            width: calc(20% - 4px);
            margin-right: 5px;
            display: inline-block;

            &:last-child {
              margin-right: 0;
            }

            img {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 1px solid #5b3932;
            }
          }
        }
      }
    }
  }

  .block_line {
    width: 100%;
    background-color: #c6c6c6;
    height: 1px;
    margin: 20px 0;

    @media (min-width: 800px) {
      display: none;
    }
  }

  .product_of-day {
      color: #fff;
      font-size: 16px;
      padding: 2px 10px;
      text-transform: uppercase;
      font-weight: 600;
      background-color: #6bc301;
    }
</style>