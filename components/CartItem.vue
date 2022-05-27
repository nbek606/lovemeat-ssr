<template>
  <div 
    class="cart_item"
    v-if="list.length > 0"
  >
    <h1 class="global-title">Корзина товаров</h1>
    <!--desktop min-width:700px-->
    <table class="cart_item-desktop">
      <thead class="cart_item-header">
        <tr>
          <th>
          </th>
          <th>
          </th>
          <th>
            Название
          </th>
          <th>
            Цена (кг, шт)
          </th>
          <th>
            Количество (кг, шт)
          </th>
          <th>
            Сумма
          </th>
        </tr>
      </thead>
      <tbody class="cart_item-list">
        <tr
          class="cart_item-list-item"
          v-for="item in list"
          :key="item.id"
        >
          <td class="cart_item-list-item-remove">
            <span 
              class="material-icons"
              @click="removeInCart(item)"
            >
              close
            </span>
          </td>
          <td
            class="cart_item-list-item-img"
          >
            <img 
              v-if="item.images != undefined && item.images[0]"
              :src="$productService.generateImg(item.images[0].src, '150')" 
            />
            <img 
              v-else
              src="@/assets/icons/png/no-photo.png"
            />
          </td>
          <td
             class="cart_item-list-item-name"
          >
             <span class="mobile_title">
               Название:
             </span>
            
            <span 
              @click="sendProductPage(item.slug)"
              class="title"
            >
              {{ item.name }}
            </span>
          </td>
          <td
             class="cart_item-list-item-price"
          >
             <span class="mobile_title">
               Цена (кг, шт):
             </span>

            <span class="mobile_price">
              {{ item.price }}
             </span> 
          </td>
          <td>
            <div class="cart_item-list-item-count">
               <span class="mobile_title">
                Количество (кг, шт):
              </span>
              <span class="cart_item-list-item-count-buttons">
                <span 
                  class="minus"
                  :class="{ disabled : minButtonDisabled(item) }"
                  @click="changeCount(-sinfulness, item)"
                >
                  -
                </span>
                <span class="value">
                  {{ item.selected_volume }}
                  <span v-if="saleType(item) == 'kg'">
                    кг
                  </span>
                  <span v-else>
                    шт
                  </span>
                </span>
                <span 
                  class="plus"
                  @click="changeCount(sinfulness, item)"
                >
                  +
                </span>
              </span>
            </div>
          </td>
          <td class="cart_item-list-item-sum">
             <span class="mobile_title">
               Сумма:
             </span>
             <span class="value">
               {{ (item.selected_volume * item.price).toFixed(0) }}
             </span> 
          </td>
        </tr>
      </tbody>
    </table>
    <div class="cart_item-bottom">
      <div class="cart_item-bottom-top">
        <div class="cart_item-bottom-sum">
          <span class="text">Доставка:</span>

          <span 
            class="value"
          >
            {{ deliverySum  }}
          </span>
        </div>
        <div class="cart_item-bottom-sum">
          <span class="text">Итого:</span>
          <span class="value">{{ cartSum }} </span>
        </div >
      </div>
      <div class="cart_item-bottom-bottom">
        <div class="cart_item-bottom-sum">
          <span class="text">Общая сумма:</span>
          <span class="value">{{ resultSum }} </span>
        </div >
        <div 
          class="cart_item-bottom-button"
          @click="sendCheckout"
        >
          Оформить заказ
        </div>
      </div>
    </div>
  </div>
  <div
    class="cart_item-empty" 
    v-else
  >
    Корзина пуста...
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { RouteName } from '@/router/utils'
export default {
  name: 'CartItem',
  data () {
    return {
      sinfulness: 0.1
    }
  },
  computed: {
    ...mapGetters({
      list: 'cart/getCartProductList',
      cartSum: 'cart/getCartSum'
    }),
    deliverySum () {
      return +this.$jsonService.delivery.freeLimit > this.cartSum ? this.$jsonService.delivery.price : 0
    },
    resultSum () {
      return +this.deliverySum + this.cartSum
    },
  },
  methods: {
    changeCount (sinfulness, item) {
      if (this.saleType(item) != 'kg') {
        sinfulness = sinfulness * 10      
      }

      this.$store.dispatch('cartProductList', {
        sum: +this.allSum(sinfulness, item),
        weight: +sinfulness,
        product: item,
      })
    },
    allSum (sinfulness, item) {
      const allSum = +item.price * sinfulness
      return allSum.toFixed(0)
    },
    saleType (product) {
      return this.$productService.saleType(product).value 
    },
    minButtonDisabled (item) {
      return item.selected_volume * 1000 <= Number(this.$productService.getMinMaxWeight(item).min.value)
    },
    removeInCart(item) {
      this.$store.dispatch('removeProductInCartList', item)
    },
    sendCheckout () {
      console.log(this.$router.options)
      this.$router.push({
        name: RouteName.Checkout
      })
    },

    sendProductPage (slug) {
      this.$router.push({
        name: RouteName.Product,
        params: {
          slug: slug
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .cart_item {
    width: 100%;
    max-width: 1200px;
    padding-bottom: 100px;

    &-empty {
      font-size: 30px;
      font-weight: 600;
      border-radius: 10px;
      color: #6b6b6b;
      min-height: 400px;
    }

    &-desktop {
      width: 100%;

      @media (max-width:930px) {
        border-bottom: none;
      }
    }

    &-header {
      @media (max-width:930px) {
       display: none;
      }
    }

    &-bottom {
      display: flex;
      flex-direction: column;
      padding: 20px 0;
      font-size: 18px;

      @media (max-width: 500px) {
        flex-direction: column;
      }

      &-bottom {
        display: flex;
        justify-content: right;
        align-items: center;
        padding: 20px 0px;

        @media (max-width: 600px) {
          flex-direction: column;
          padding: 20px 0;
        }
      }

      &-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #6b6b6b;
        border-bottom: 1px solid #6b6b6b;
        padding: 20px 30px;
        box-sizing: border-box;

        @media (max-width: 600px) {
          flex-direction: column;
          padding: 20px 0;
        }
      }
    
      &-sum {
        display: flex;
        padding-right: 30px;

        @media (max-width: 600px) {
          padding-bottom: 20px;
        }

        .text {
          font-weight: 600;
          color: #7e7e7e;
        }

        .value {
          font-weight: 600;
          margin-left: 10px;


          &::after {
            content: "\20BD";
            margin-left: 5px;
          }
        }

        .free {
          font-weight: 600;
          margin-left: 10px;
        }
      }

      &-button {
        background-color: #b12a2f;
        color: #fff;
        padding: 10px 20px;
        border-radius: 10px;
        color: #fff;
        transition: all 0.5s;
        cursor: pointer;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 170px;

        @media (max-width: 500px) {
          text-align: center;
        }


        &:hover {
          letter-spacing: 1px;
        }
      }
    }

    &-list {
      &-item {

        &-sum {
          .value {
            &::after {
                content: "\20BD";
                margin-left: 5px;
            }
          }
        }


        border-bottom: 1px solid silver;
        font-size: 18px;
        font-weight: 500;
        padding: 20px 0;

        &:last-child {
          border: none;
        }

        &-remove {
          padding-right: 10px;
          display: flex;
          cursor: pointer;
          width: 20px;

          @media (max-width:930px) {
            width: 100%;
            max-width: 200px;
            margin-left: -5px;

            span {
              font-size: 30px;
            }
          }
        }

        @media (max-width:930px) {
          display: flex;
          flex-direction: column;
        }

        .mobile_title {
          font-weight: 600;
          color: #b12a2f;

          @media (min-width:930px) {
             display: none;
          }
        }

        &-img {
          width: 140px;
          padding: 20px 0;
          min-width: 140px;

          @media (max-width:930px) {
            width: 100%;
            max-width: 200px;
          }
        }

        &-count {
          display: flex;
          align-items: center;
          justify-content: center;

          &-buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;

             @media (max-width:930px) {
               justify-content: left;
               margin-left: -10px;
             }
          }

          @media (max-width:930px) {
            justify-content: left;
            align-items: start;
          }

          .minus, .plus {
            margin: 0 10px;
            border: 1px solid;
            height: 20px;
            width: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .value {
            min-width: 60px;
            
          }
        }
        
        &-price, &-sum, &-count, &-name {
          color: #121212;
          padding: 30px;
          text-align: center;
          

           @media (max-width:930px) {
            font-size: 20px ;
            padding: 20px 0;
            text-align: left;
            display: flex;
            justify-content: space-between;
          }

          @media (max-width:930px) {
            flex-direction: column;
            justify-content: left;
            padding: 10px 0;
          }
        }

        &-name {
          .title {
            cursor: pointer;
            color: #000000;
            transition: all 0.5s;

            &:hover {
              color: #810c0c;
            }
          }
        }

        &-price, &-sum {
          min-width: 120px;
          
          .mobile_price {
            &::after {
              content: "\20BD";
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

  img {
    width: 100%;
  }

  .global-title {
    margin-bottom: 40px;
  }
</style>