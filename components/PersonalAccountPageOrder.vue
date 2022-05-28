<template>
  <div 
    class="orders"
    v-if="orders.length > 0"
  > 
    <h1 class="global_title">Ваши заказы</h1>
    <!--модал-->
    <div 
      class="cart_modal"
      v-if="showCartModal"
    >
      <div class="cart_modal-block">
        <div class="cart_modal-block-close">
          <span 
            class="material-icons"
            @click="closeCartModal"
          >
            close
          </span>
        </div>
        <button 
          class="cart_modal-block-button"
          @click="changeCart('clear')"
        >
          Заменить корзину
        </button>
        <button 
          class="cart_modal-block-button"
          @click="changeCart('merge')"
        > 
          Объединить товары с товарами в корзине
        </button>
      </div>
    </div>

    <div class="orders_mobile">
       <div 
        class="orders_row"
        v-for="order in orders"
        :key="order.id"
      >
          <div class="orders_row-id orders_row-id-title">
            № заказа
          </div>

          <div class="orders_row-id">
            {{ order.id }}
          </div>

          <div class="orders_row-date orders_row-date-title">
            Дата
          </div>

          <div class="orders_row-date">
            {{ $dateService.getStandartDate(order.date_created) }}
          </div>

          <div class="orders_row-status orders_row-status-title">
            Статус
          </div>

          <div 
            class="orders_row-status"
          >
            {{ $jsonService.paymentsRu[order.status] }}
          </div>

          <div class="orders_row-details orders_row-details-title">
            Детали заказа
          </div>

          <div class="orders_row-details">
            <div class="orders_row-details-total">
              <strong>{{ order.total }}</strong> руб.
              <strong> {{ order.line_items.length }} </strong> поз.
            </div>
            <div class="orders_row-details-products">
              <span
                class="orders_row-details-products-item"
                v-for="product in order.line_items"
                :key="product.id"
              >
                {{ product.name }}
                <span class="comma">
                  ,
                </span>
              </span>
            </div>
            <div class="orders_row-details-address">
              Адрес: {{ order.shipping.address_1 }} 
            </div>

            <div class="orders_row-details-buttons">
              <span 
                class="orders_row-details-buttons-item"
               @click="sendOrderPage (order.id)"
              >
                Посмотреть заказ
              </span>
              <span 
                class="orders_row-details-buttons-item double"
                @click="cartModal(order.line_items)"
              >
                Повторить заказ
              </span>
              <span 
                class="orders_row-details-buttons-item"
              >
                <a :href="`https://back.lovemeat.ru/wp-admin/admin-ajax.php?action=generate_wpo_wcpdf&document_type=invoice&order_ids=${order.id}&order_key=${order.order_key}`">
                  Печать чека
                </a>
              </span>
              <span 
                class="orders_row-details-buttons-item"
                @click="cancelOrder(order.id)"
                v-if="order.status != 'cancel-request' && order.status != 'cancelled'"
              >
                Отменить заказ
              </span>
            </div>
          </div>
      </div>   
    </div>
    <div
      class="orders_desktop"
    >
      <div class="orders_row">
        <div class="orders_row-id orders_row-id-title">
          № заказа
        </div>
        <div class="orders_row-date orders_row-date-title">
          Дата
        </div>
        <div class="orders_row-status orders_row-status-title">
          Статус
        </div>
        <div class="orders_row-details orders_row-details-title">
          Детали заказа
        </div>
      </div>   

      <div
        class="orders_row"
        v-for="order in orders"
        :key="order.id"
      >
        <div class="orders_row-id">
          {{ order.id }}
        </div>
        <div class="orders_row-date">
          {{ $dateService.getStandartDate(order.date_created) }}
        </div>
        <div class="orders_row-status">
          {{ $jsonService.paymentsRu[order.status] }}
        </div>
        <div class="orders_row-details">
          <div class="orders_row-details-total">
            <strong>{{ order.total }}</strong> руб.
            <strong> {{ order.line_items.length }} </strong> поз.
          </div>
          <div class="orders_row-details-products">
            <span
              class="orders_row-details-products-item"
              v-for="product in order.line_items"
              :key="product.id"
            >
              {{ product.name }}
              <span class="comma">
                ,
              </span>
            </span>
          </div>
          <div class="orders_row-details-address">
            Адрес: {{ order.shipping.address_1 }} 
          </div>

          <div class="orders_row-details-buttons">
            <span 
              class="orders_row-details-buttons-item"
              @click="sendOrderPage(order.id)"
            >
              Посмотреть заказ
            </span>
            <span 
              class="orders_row-details-buttons-item double"
              @click="cartModal(order.line_items)"
            >
              Повторить заказ
            </span>
            <span class="orders_row-details-buttons-item">
              <a :href="`https://back.lovemeat.ru/wp-admin/admin-ajax.php?action=generate_wpo_wcpdf&document_type=invoice&order_ids=${order.id}&order_key=${order.order_key}`">
                Печать чека
              </a>
            </span>
            <span 
              class="orders_row-details-buttons-item"
              @click="cancelOrder(order.id)"
              v-if="order.status != 'cancel-request' && order.status != 'cancelled'"
            >
              Отменить заказ
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <Pagination 
        v-if="maxPage > 1"
        :currentPage="currentPage"
        :maxPage="maxPage"
        @change-page="changePage"
      />
    </div>
  </div>
  <div class="empty_list" v-else>
      Список пуст...
  </div>
</template>
<script>
import { RouteName } from '@/router/utils'
import Pagination from '@/components/Pagination.vue'
export default {
  components: { Pagination },
  name: 'PersonalAccountPageOrder',
  props: {
    orders: {
      type: [Array, Object],
      required: true
    },
    maxPage: {
      type: [String, Number],
      required: true
    },
    currentPage: {
      type: [String, Number],
      required: true
    }
  },

  data () {
    return {
      cartProducts: [],
      showCartModal: false,
      products: []
    }
  },
  methods: {
    cancelOrder (id) {
      this.$store.dispatch('modal/LOADER_ON')
      this.$orderApiService.update(id, {
        status: 'cancel-request'
      }).then((response) => {
        this.$emit('change-status', response.data)
        this.$store.dispatch('modal/LOADER_OFF')
      }).catch(() => {
        this.$store.dispatch('modal/LOADER_OFF')
      })
    },
    sendOrderPage (id) {
      this.$productService.scrollPageTop('scroll_top')
      this.$router.push({
        name: RouteName.Order,
        params: {
          id: id
        }
      })
    },
    changePage (page) {

      this.$emit('change-page', page)
    },

    cartModal (products) {
      this.products = products
      this.showCartModal = true
    },

    closeCartModal () {
      this.products = []
      this.showCartModal = false
    },

    changeCart (cartType) {
      this.$store.dispatch('modal/LOADER_ON')
      let productIds = ''
      const quantities = []

      this.products.forEach((item, key) => {
        productIds += `${item.product_id}`
        quantities[item.product_id] = item.quantity

        if (this.products.length - 1 != key) {
          productIds += ','
        }
      })
    
      this.$productApiService.getProductByIds(productIds).then((response) => {
        if (response.data) {
          
          if (cartType == 'clear') {
            this.$store.dispatch('clearProductCartList')
          }

          response.data.forEach((item) => {
            const data = {
              product: item,
              weight: quantities[item.id],
              sum:  quantities[item.id] * item.price
            }
            this.$store.dispatch('cartProductList', data)
          })

          this.$nextTick(() => { 
            this.$store.dispatch('modal/LOADER_OFF') 
            this.$router.push ({
              name: RouteName.Cart
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .orders {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      padding-bottom: 100px;

      .cart_modal {
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(18, 18, 18, 0.5);

        &-block {
          padding: 30px;
          display: flex;
          flex-direction: column;
          max-width: 400px;
          background-color: #fff;

          &-close {
            display: flex;
            justify-content: flex-end;
            padding-bottom: 10px;

            span {
              font-size: 30px;
              cursor: pointer;
            }
          }

          &-button {
            padding: 15px 20px;
            font-size: 16px;
            color: #fff;
            margin: 10px 0;
            border: none;
            background-color: #b12a2f;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              background-color:#e4605c;
            }
          }
        }
      }

      &_desktop {
        @media (max-width: 650px) {
          display: none;
        }
      }

      &_mobile {
        @media (min-width: 650px) {
          display: none;
        }

        .orders_row {
          padding-bottom: 40px;
          flex-direction: column;
          background-color: #fff;
          border: none;

          &:last-child {
            border: none;
          }

           &-id, &-date, &-status, &-details { 
             border: none;
             text-align: center;
             width: 100%;
             max-width: 100%;
             box-sizing: border-box;
             border-left: 1px solid #7b7b7b;
             border-right: 1px solid #7b7b7b;

             &:last-child {
               border-bottom: 1px solid #7b7b7b;
             }
           }

           &-id-title, &-date-title, &-status-title, &-details-title { 
             background-color: #e9e9e9;
             border: 1px solid #7b7b7b;
           }
        }
      }

      &_row {
        display: flex;
        border: 1px solid #7b7b7b;
        border-bottom: 0;
        color: #6b6b6b;

        &:last-child {
          border: 1px solid #7b7b7b;;
        }

        &-id, &-date, &-status {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
        }

        &-id {
          border-right: 1px solid #7b7b7b;
          width: 100px;
          min-width: 100px;
          max-width: 100px;
        }

        &-date {
          border-right: 1px solid #7b7b7b;
          width: 160px;
          min-width: 160px;
          max-width: 160px;
          text-align: center;
        }

        &-status {
          border-right: 1px solid #7b7b7b;
          width: 120px;
         min-width: 120px;
          max-width: 120px;
          text-align: center;
        }

        &-details {
          flex-direction: column;
          padding: 10px;
          display: flex;

          &-products {
            padding: 5px 0;
            
            &-item {

              &:last-child {
                .comma {
                  display: none;
                }
              }
            }
          }

          &-buttons {
            padding-top: 20px;

            &-item {
              padding-right: 20px;
              text-decoration: underline;
              cursor: pointer;
              a {
                color: #121212;
              }

              @media (max-width: 1110px) {
                display: flex;
                flex-direction: column;
                padding: 5px 0;
              }
            }
            
            .double {
              color: #b12a2f;
            }
          }
        }
      }
  }
</style>