<template>
  <transition name="fade">
    <div 
      class="create_order"
      v-if="getCreateOrderModal"
    >
      <div class="form">
          <div class="form_top">
            <span class="form_top-title">
              Оформление заказа
            </span>
            <span
              class="form_top-close material-icons"
              @click="close"
            >
              close
            </span>
          </div>

          <div class="form_center">
            <div class="form_center-group">

            
            </div>
          </div>
    
          <div class="form_bottom">
            <b-form  @submit.prevent="send">

              <InputText
                  v-model="form.name"
                  label="Имя:"
                  placeholder="Имя"
                  :required="true"
              />

              <InputText
                  v-model="form.phone"
                  label="Номер телефона:"
                  placeholder="+7 (131) 232-13-21"
                  :required="true"
              />
              
              <b-button 
                  type="submit"
                  class="form_bottom-button"
              >
                Отправить
              </b-button>
              <span 
                class="form_error"
                v-if="error"
              >
                  {{ error }}
              </span>
            </b-form>
          </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import InputText from '@/components/InputText.vue'
export default {
  components: { InputText },
  name: 'CreateOrder',
  data () {
    return {
      form: {
        name: '',
        phone: ''
      },
      error: ''
    }
  },
  computed: {
    ...mapGetters({
      getCreateOrderModal: 'modal/getCreateOrderModal', 
      getCartProductList: 'modal/getCartProductList', 
      getCartSum: 'modal/getCartSum'
    })
  },
  methods: {
    close () {
      this.$store.dispatch('modal/createOrderModal', false)
    }
  }
}
</script>
<style lang="scss" scoped>
  .create_order {
      position: fixed;
      width: 100%;
      height: 100vh;
      background-color: rgba(18, 18, 18, 0.5);
      z-index: 11;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 30px;
      box-sizing: border-box;

      .form {
        width: 600px;
        background-color: #fff;
        border-radius: 10px;

        &_center {
          &-group {
            &-item {

              .title {

              }

              .value {
                &::after {
                  content: "\20BD";
                  margin-left: 5px;
                }
              }
            }
          }
        }

        &_bottom {
          padding: 30px;

          &-button {
            padding: 10px 15px;
            font-size: 16px;
            color: #fff;
            border: none;
            background-color: #b12a2f;
            margin-top: 30px;
            border-radius: 5px;
            cursor: pointer;
            display: inline-block;
            max-width: 160px;

            @media (max-width:450px) {
            max-width: 100%;

            }
          }
        }

        &_top {
          padding: 20px 30px;
          border-bottom: 1px solid silver;
          display: flex;
          align-items: center;
          justify-content: space-between;

          &-title {
            font-size: 25px;
          }

          &-close {
            font-size: 35px;
            cursor: pointer;
          }
        }
      }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>