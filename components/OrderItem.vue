<template>
  <div 
    class="order_item"
    v-if="order"
  >
    <h1 class="global_title">{{ `Заказ №${order.id}` }}</h1>
    <div class="order_item-header">
      <div 
        class="order_item-header-item"
        v-for="(item, index) in  headerData"
        :key="index"
      >
        <span class="title">
          {{ item.title }}:
        </span>
        <span 
          class="value"
          :class="{ ruble: item.ruble}"
        >
          {{ item.value }}
        </span>
      </div>
    </div>
    <div class="order_item-products">
      <div class="order_list">
        <div 
          class="order_list-item"
          v-for="item in order.line_items"
          :key="item.id"
        >
          <div class="order_list-item-left">
            <span class="name">
              {{ item.name }}
            </span>
            <span class="material-icons icon">
              close
            </span>
            <span class="count">
              {{ item.quantity }}
            </span>
          </div>
          <div class="order_list-item-right">
            <span class="sum">
              {{ item.subtotal }}
            </span>
          </div>
        </div>
      </div>
      <div class="order_subtotal">
        <div class="order_subtotal-left">
          Подытог
        </div>
        <div class="order_subtotal-right">
          {{  order.total  }}
        </div>
      </div>
      <div class="order_delivery">
        <div class="order_delivery-left">
          Доставка
        </div>
        <div class="order_delivery-right">
          {{  deliverySum }}
        </div>
      </div>
      <div class="order_total">
        <div class="order_total-left">
          Итого
        </div>
        <div class="order_total-right">
          {{ resultSum  }}
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    Заказа нет
  </div>
</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    order: {
      type: [Array, Object, Boolean],
      required: true
    }
  },
  computed: {
    headerData () {
      return [
        {
          title:'Дата',
          value: this.$dateService.getStandartDate(this.order.date_created)
        },
        {
          title:'Статус',
          value: this.$jsonService.paymentsRu[this.order.status]
        },
        {
          title:'Итого',
          value: this.order.total,
          ruble: true
        },
      ]
    },

    deliverySum () {
      if (!this.order) {
        return 0
      }

      return +this.$jsonService.delivery.freeLimit > this.order.total ? this.$jsonService.delivery.price : 0
    },

    resultSum () {
      if (!this.order) {
        return 0
      }

      return Number(this.order.total) + Number(this.deliverySum)
    }
  }
}
</script>
<style lang="scss" scoped>
  .order_item {
    &-header {
      display: flex;
      flex-direction: column;

      &-item {
        padding: 5px 0;
        
        .title {
          font-weight: 600;
        }
      }
    }

    &-products {
      max-width: 400px;
      padding-top: 20px;
    }

    .order_delivery {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #dadada;
      padding: 20px 0;

      @media (max-width:600px) {
        flex-direction: column;
      }

      &-left {
        font-size: 16px;  
        font-weight: 600;

        @media (max-width:600px) {
          padding-bottom: 10px;
        }
      }

      &-right{
        font-size: 18px;
        font-weight: 600;

        @media (max-width:600px) {
          color: #b12a2f;
        }

        &::after {
          content: "\20BD";
          margin-left: 5px;
        }
      }
    }

    .order_total {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;

        @media (max-width:600px) {
          flex-direction: column;
        }

        &-left {
          font-size: 16px;  
          font-weight: 600;

          @media (max-width:600px) {
            padding-bottom: 10px;
          }
        }

        &-right{
          font-size: 18px;
          font-weight: 600;

          @media (max-width:600px) {
              color: #b12a2f;
          }

          &::after {
            content: "\20BD";
            margin-left: 5px;
          }
        }
      }
    
    .order_subtotal {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #dadada;
      border-bottom: 1px solid #dadada;
      padding: 20px 0;

      @media (max-width:600px) {
        flex-direction: column;
      }

      &-left {
        font-size: 16px;  
        font-weight: 600;

        @media (max-width:600px) {
          padding-bottom: 10px;
        }
      }

      &-right{
        font-size: 18px;
        font-weight: 600;

        @media (max-width:600px) {
          color: #b12a2f;
        }

        &::after {
          content: "\20BD";
          margin-left: 5px;
        }
      }
    }

    .order_list {
      &-item {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width:600px) {
          flex-direction: column;
          justify-content: start;
          align-items: flex-start;
        }

        &-left {
          display: flex;

          @media (max-width:600px) {
            margin-bottom: 10px;
          }

          .name {
            font-size: 16px;
            font-weight: 600;
          }

          .icon {
            font-size: 15px;
            padding: 0 5px;
            line-height: 25px;
          }

          .count {
            font-size: 16px;
            font-weight: 600;
          }
        }

        &-right {
          @media (max-width:600px) {
            color: #b12a2f;
          }

          .sum {
            font-size: 18px;
            font-weight: 600;

            &::after {
              content: "\20BD";
              margin-left: 5px;
            }
          }
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