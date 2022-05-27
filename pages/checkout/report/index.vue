<template>
  <div class="checkout_report content_layout">
    <div v-if="orderConfidrmedData">
      <div class="confirmed">
        <h1 class="global_title">Ваш заказ принят, Благодарим вас</h1>
        <div class="confirmed_top">
          <div 
            class="confirmed_top-item"
            v-for="(item, index) in confirmed.top"
            :key="index"
          >
            <div class="confirmed_top-item-title">
                {{ item.title }}
            </div>
            <div 
              class="confirmed_top-item-value"
              :class="{ 'ruble' : item.ruble }"
            >
                {{ item.value }}
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CheckoutReport',
  mounted () {
     this.$productService.scrollPageTop('scroll_top')
  },  
   //метаданные
  head () {
    return {
      title: 'Оформление заказа'
    }
  },

  computed: {
    ...mapGetters({
      orderConfidrmedData: 'checkout/getCheckout'
    }),

    subtotal () {
      return +this.orderConfidrmedData.total - this.orderConfidrmedData.shipping_total
    },

    confirmed () {
      
      if (!this.orderConfidrmedData) {
        return false
      } 

      return {
        top: [
          {
            title: 'Номер заказа:',
            value: this.orderConfidrmedData.id
          },
          {
            title: 'Дата:',
            value: this.$dateService.getStandartDate(this.orderConfidrmedData.date_created)
          },
          {
            title: 'Email:',
            value: this.orderConfidrmedData.billing.email
          },
          {
            title: 'Подытог:',
            value: `${this.subtotal},00`,
            ruble: true
          },
          {
            title: 'Доставка:',
            value: this.orderConfidrmedData.shipping_total,
            ruble: true
          },
          {
            title: 'Итого:',
            value: this.orderConfidrmedData.total,
            ruble: true
          },
          {
            title: 'Метод оплаты:',
            value: this.orderConfidrmedData.payment_method == 'bacs' ? 'Онлайн перевод' : 'Наличными курьеру'
          }
        ]
      }
    }
  },
}
</script>
<style lang="scss" scoped>
  .confirmed {
    padding: 0 30px;
    min-height: 500px;

    &_top {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;

      &-item {
        display: flex;
        padding: 10px 0;

        &-title {
          text-transform: uppercase;
          font-size: 18px;
          margin-right: 10px;
        }

        &-value {
          font-weight: 600;
          font-size: 18px;
        }
      }
    }
  }
  .ruble {
    &::after {
      content: "\20BD";
      margin-left: 5px;
    }
  }
</style>