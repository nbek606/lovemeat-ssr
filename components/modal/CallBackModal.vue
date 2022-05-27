<template>
  <transition name="fade" v-if="modal">
    <div 
      class="request_call"
    >
      <NoticeForm
        v-show="mailSent"
        :message="message"
      />
      <div 
        class="request_call-form"
        v-show="!mailSent"
      >
        <div class="form_title">
          <span class="form_title-text">
            Заказать обратный звонок
          </span>
          <span 
            class="form_title-close material-icons"
            @click="close"
          >
            close
          </span>
        </div>

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
              placeholder="+7 (967) 018-37-77"
              :required="true"
          />

          <b-button 
              type="submit"
              class="form_button"
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
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'

/* import componetns */
import InputText from '@/components/InputText.vue'
import NoticeForm from './NoticeForm.vue'

export default {
  name: 'RequestCall',
  components: {
    InputText,
    NoticeForm
  },
  data () {
    return {
      form: {
        name: '',
        phone: ''
      },
      error: '',
      message: '',
      mailSent:false
    }
  },
  computed: {
    ...mapGetters({
      modal: 'modal/getRequestCall',
    })
  },
  methods: {
    close () {
      this.mailSent = false,
      this.$store.dispatch('modal/requestCall', false)
    },
    send () { 
      this.$store.dispatch('modal/LOADER_ON')
      this.error = ''
      this.message = ''
  
      const formData = new FormData ()

      formData.append("your-name", this.form.name)
      formData.append("tel-809", this.form.phone)

      this.$contactApiService.requestCall(formData).then((response) => {
        this.$store.dispatch('modal/LOADER_OFF')
        
        if (response.data.status == 'mail_sent') {
          this.message = response.data.message
          this.mailSent = true

           /* закрываем уведомление через секунду*/
          setTimeout(() => {
            this.close()
          }, 1000)
          //Очищаем форму
          setTimeout(() => {
            this.clearForm()
          }, 2000)
        } else {
          this.error = response.data.message
        }
      })
    },
    clearForm () {
      this.form.name = '',
      this.form.phone = ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .request_call {
      position: fixed;
      width: 100%;
      height: 100vh;
      background-color:rgba(18,18,18, 0.5);
      z-index: 11;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 30px;
      box-sizing: border-box;
      bottom: 0;

      form {
        padding: 30px 30px;
        display: flex;
        flex-direction: column;

        @media (max-width:450px) {
          padding: 10px 15px;
        }

      }

      &-form {
        width: 600px;
        background-color: #fff;
        border-radius: 10px;

        .form_title {
          padding: 20px 30px;
          border-bottom: 1px solid silver;
          display: flex;
          align-items: center;
          justify-content: space-between;

          @media (max-width:450px) {
            padding: 10px 15px;
          }

          &-text {
            font-size: 25px;
          }

          &-close {
            font-size: 35px;
            cursor: pointer;
          }
        }

        .form_button {
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

        .form_error {
          margin-top: 10px;
          font-size: 12px;
          color: #b12a2f;
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