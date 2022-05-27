<template>
<div>
  <b-form 
    class="checkout_item"  
    @submit.prevent="send"
  >
    <div class="checkout_item-left">
      <div class="checkout_item-left-title">
        Детали
      </div>
      <!--форма-->
        <div class="form"> 
          <div class="form_name">
            <InputText 
              v-model="form.billing.first_name"
              label="Имя"
              :required="true"
            />
            <InputText
              v-model="form.billing.last_name"
              label="Фамилия"
              :required="true"
            />
          </div>
          <div class="form_city">
            <InputSelect
              v-model="form.billing.city"
              label="Город"
              :options="$jsonService.cities"
              :required="true"
            />
          </div>
          <div class="form_address">
            <InputAutocomplateAddress
              v-model="form.shipping.address_1"
              placeholder="Номер дома и название улицы"
              label="Улица, дом"
              :city="form.billing.city"
              :required="true"
            />
          </div>
          <div class="form_address-properties">
            <div class="form_address-properties-item">
              <InputText
                v-model="properties.pd"
                label="Подъезд №"
              />
            </div>
            <div class="form_address-properties-item">
              <InputText
                v-model="properties.etzh"
                label="Этаж"
              />
            </div>
            <div class="form_address-properties-item">
              <InputText
                v-model="properties.kv"
                label="Квартира №"
              />
            </div>
            <div class="form_address-properties-item">
              <InputText
                v-model="properties.df"
                label="Код домофона"
              />
            </div>
          </div>
          <div class="form_phone">
            <InputText
              v-model="form.billing.phone"
              label="Телефон"
              placeholder="+7 (967) 018-37-77"
              :mask="['+7 (###) ###-##-##']"
              :required="true"
            />
          </div>
          <div class="form_phone">
            <InputText
              v-model="form.billing.email"
              label="Email"
              type="email"
              :required="true"
            />
          </div>
          <div class="form_description">
            <TextArea
              v-model="form.customer_note"
              placeholder="Примечания к вашему заказу, например, особые пожелания"
              label="Примечания к заказу (необязательное)"
            />
          </div>
          <div 
            class="form_bonus"
            v-if="bonus"
          >
            Мы дарим Вам подарок на выбор - 2 десятка яиц или цыпленка - укажите в примечании к заказу.
          </div>
          <div class="form_delivery">
            Доставка осуществляется по г.Москве и г.Химки
          </div>
        </div>
    </div>

    <!--заказ-->
    <div class="checkout_item-right">
      <div class="checkout_item-right-title">
        Ваш заказ
      </div>
      <div class="order">
        <div class="order_list">
          <div 
            class="order_list-item"
            v-for="item in list"
            :key="item.key"
          >
            <div class="order_list-item-left">
              <span class="name">
                {{ item.name }}
              </span>
              <span class="material-icons icon">
                close
              </span>
              <span class="count">
                {{ item.selected_volume }}
              </span>
            </div>
            <div class="order_list-item-right">
              <span class="sum">
                {{ productSum(item) }},00
              </span>
            </div>
          </div>
        </div>
        <div class="order_subtotal">
          <div class="order_subtotal-left">
            Подытог
          </div>
          <div class="order_subtotal-right">
            {{ cartSum }},00
          </div>
        </div>
        <div class="order_delivery">
          <div class="order_delivery-left">
            Доставка
          </div>
          <div class="order_delivery-right">
            {{ deliverySum }},00
          </div>
        </div>
        <div class="order_total">
          <div class="order_total-left">
            Итого
          </div>
          <div class="order_total-right">
            {{ resultSum }},00
          </div>
        </div>

        <div class="order_payment">
          <div class="order_payment-title">
            Метод оплаты 
            <span class="order_payment-title-star">
              *
            </span>
          </div>
          <div class="order_payment-radio">
            <div class="order_payment-radio-item">
              <input 
                type="radio"
                id="some-radios-cod"
                v-model="form.payment_method"
                value="cod"
                name="some-radios"
                class="custom-checkbox"
              >
              <label for="some-radios-cod">Наличными курьеру</label>  
            </div>

            <div class="order_payment-radio-item">
              <input 
                type="radio"
                id="some-radios-bacs"
                v-model="form.payment_method"
                value="bacs"
                name="some-radios"
                class="custom-checkbox"
              >
              <label for="some-radios-bacs">Онлайн перевод</label>  
            </div>
          </div>
        </div>
        <div class="order_privacy">
          Ваши личные данные будут использоваться для
          обработки ваших заказов, упрощения вашей 
          работы с сайтом и для других целей, описанных в нашей
          <span 
            class="order_privacy-link"
            @click="sendPolicyPage"
          >
            политика конфиденциальности.
          </span>
          <button 
            class="order_button"
          >
            Подтвердить заказ
          </button>
        </div>
      </div>
    </div>
   </b-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { RouteName } from '../router/utils'
import InputAutocomplateAddress from './InputAutocomplateAddress.vue'
import InputSelect from './InputSelect.vue'
import InputText from './InputText.vue'
import TextArea from './TextArea.vue'

export default {
  name: 'CheckoutItem',
  components: { 
    InputText,
    InputSelect,
    InputAutocomplateAddress,
    TextArea
  },
  data () {
    return {
      orderConfirmed: false,
      paymentMethods:{
        cod: "Наличными курьеру",
        bacs: "Онлайн перевод"
      },
      form: {
        shipping_lines: [],
        billing: {
          first_name: '',
          last_name: '',
          city: 'Москва',
          address_1:'',
          phone: '',
          email: '',
          description: '',
        },
        shipping: {
          address_1: ''
        },
        status:'processing',
        customer_note: '',
        payment_method: 'cod',
        payment_method_title: '',
        line_items: [],
        customer_id: 0
      },
      properties: {
        etzh: '',
        kv: '',
        df: '',
        pd: ''
      }
    }
  },
  mounted () {
    this.getAccountData()
  },
  computed: {
    ...mapGetters({
      list: 'cart/getCartProductList',
      cartSum: 'cart/getCartSum',
      account: 'account/getAccountData'
    }),
    deliverySum () {
      return +this.$jsonService.delivery.freeLimit > this.cartSum ? this.$jsonService.delivery.price : 0
    },
    deliveryMethod () {
      return this.deliverySum != 0 ? this.$jsonService.delivery.methods.flat_rate: this.$jsonService.delivery.methods.free_shipping
    },
    resultSum () {
      return +this.deliverySum + this.cartSum
    },
    bonus () {
      return this.cartSum > 4500
    },
    pd () {
      return this.properties.pd == '' ? '' : `| подъезд №: ${this.properties.pd}` 
    },
    kv () {
      return this.properties.kv == '' ? '' : `| кв №: ${this.properties.kv}` 
    },
    etzh () {
      return this.properties.etzh == '' ? '' : `| этаж: ${this.properties.etzh}` 
    },
    df () {
      return this.properties.df == '' ? '' : `| код домофона: ${this.properties.df}` 
    },
    homeProperties () {
      return `${this.form.shipping.address_1} ${this.pd} ${this.etzh} ${this.kv} ${this.df}`
    }
  },
  methods: {
    getAddressProfile (address) {
      this.properties = this.$profileService.addresProperties(address)
    },
    sendPolicyPage () {
      this.$router.push({
        name: RouteName.PrivacyPolicy
      })
    },
    productSum (item) {
      if (+item.price == 0) {
        return 0
      }
      return  (+item.price * +item.selected_volume).toFixed(0)
    },
    getAccountData () {
      if (Object.keys(this.account).length > 0) {
        this.form.billing = this.account.billing
        this.form.shipping =this.account.shipping
        this.form.billing.email = this.account.email
        this.form.customer_id = this.account.id
        this.getAddressProfile(this.form.shipping.address_1)
      }
    },

    send () {
      this.form.line_items = this.lineItems()
      this.form.shipping = {
        first_name: this.form.billing.first_name,
        last_name: this.form.billing.last_name,
        city: this.form.billing.city,
        address_1: this.homeProperties,
        phone: this.form.billing.phone,
        email: this.form.billing.email,
        description: this.form.billing.description,
      }

      this.form.shipping_lines.push ({
        method_id: this.deliveryMethod.id,
        method_title: this.deliveryMethod.title,
        total: ""+ this.deliverySum + "",
      })
      
      this.form.payment_method_title = this.paymentMethods[this.form.payment_method]

      this.$store.dispatch('modal/LOADER_ON')
      this.$orderApiService.createOrder(this.form).then((response) => {
        if (response.data) {
          this.$router.push({
            name: RouteName.CheckoutReport
          })
          
          this.$store.dispatch('checkout/checkout', response.data)
          this.$store.dispatch('cart/clearProductCartList')

          this.$store.dispatch('modal/LOADER_OFF')
        }
      })
    },
    lineItems () {
      
      const list = []

      this.list.forEach(item => {
        list.push({
          product_id: item.id,
          quantity: item.selected_volume,
        })
      });
    
      return list
    }
  }
}
</script>
<style lang="scss" scoped>
  .checkout_item {
    display: flex;

    .form_bonus {
      padding: 10px 0;
      color: #7a9c31;
    }

    @media (max-width:1024px) {
      flex-direction: column;
    }

    &-left {
      width: 50%;
      box-sizing: border-box;
      
      @media (max-width:1024px) {
        width: 100%;
      }

      &-title {
        border-bottom: 1px solid #dadada;
        padding: 20px 0;
        font-size: 18px;
        font-weight: 600;
      }

      .form {
        box-sizing: border-box;
        padding-right: 25px;

        @media (max-width:1024px) {
          padding-right: 0;
        }
        
        &_name {
          display: flex;

          @media (max-width:600px) {
            flex-direction: column;
          }

          .input {
            width: 50%;
            
           @media (max-width:600px) {
            width: 100%;
           }

            &:nth-child(1) {
              margin-right: 50px;
            }
          }
        }
      }
    }

    &-right {
      width: 50%;

      @media (max-width:1024px) {
        width: 100%;
      }

      &-title {
        border-bottom: 1px solid #dadada;
        padding: 20px 0;
        font-size: 18px;
        font-weight: 600;
      }

      .order {
        box-sizing: border-box;

        @media (max-width:1024px) {
          padding-left: 0;
        }

        &_button {
          border: none;
          padding: 15px 30px;
          font-size: 20px;
          color: #fff;
          width: 100%;
          background-color: #b12a2f;
          margin: 20px 0;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.5s;

          &:hover {
            letter-spacing: 1px;
          }
        }

        &_privacy {
          padding: 20px 0;
          
          &-link {
            text-decoration: underline;
            cursor: pointer;
            color: #000000;

            transition: all 0.5s;

            &:hover {
              color: #810c0c;
            }
          }
        }

        &_subtotal {
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

        &_delivery {
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


        &_total {
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

        &_payment {
          border-top: 2px solid;
          margin-top: 20px;

          &-title {
            font-size: 18px;
            font-weight: 600;
            padding: 20px 0;

            &-star {
              color:#b12a2f;
            }
          }

          &-radio {
            cursor: pointer;
            padding: 5px 0;
            display: flex;
            flex-direction: column;

            .custom-checkbox + label::before {
              border-radius: 10px;
            }

            &-item {
              display: flex;
              align-items: center;
              padding: 7px 0px;

              input {
                width: 18px;
                height: 18px;
                margin-right: 10px;
                cursor: pointer;
              }

              label {
                cursor: pointer;
                
              }
            }
          }

          .custom-control.custom-radio {
            cursor: pointer !important;

            .custom-control-input {
              width: 20px;
              height: 40px;
            }
          }

         
        }

        &_list {

          &-item {
            padding: 20px 0;
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
    }
  }

  .form_address-properties {
    display: flex;
    flex-wrap: wrap;

    &-item {
      width: calc(50% - 10px);
      box-sizing: border-box;
      
      &:nth-child(2n) {
        margin-left: 20px;
      }
    }
  }
</style>