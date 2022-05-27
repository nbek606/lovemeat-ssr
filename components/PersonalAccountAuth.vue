<template>
  <div class="personal_account">
    <div class="global_title">
      Личный кабинет
    </div>
    <div 
      class="personal_account-login"
      v-if="loginActive"
    >
      <form
        class="form"
        @submit.prevent="login"
      >
        <div class="form_title">
          Вход
        </div>
        
        <div class="form_name">
          <InputText 
            v-model="form.email"
            label="Email"
            :required="true"
          />
        </div>

        <div class="form_password">
          <InputText 
            v-model="form.password"
            label="Пароль"
            :required="true"
            type="password"
            :password="true"
          />
          <div 
            class="link_send"
            @click="changePassword"
          >
            Забыли пароль?
          </div>
        </div>
        <div 
          v-if="error"
          class="error"
        >
          {{ error }}
        </div>
        <div class="form_password-remember">
          <input
            v-model="form.password_remember"
            type="checkbox"
            class="filter_group-item-input custom-checkbox"
            id="form_password-remember"
          />
          <label for="form_password-remember">
            Запомнить пароль
          </label>
        </div>
     
        <button class="form_button">
          Войти
        </button>

         <div class="link">
          У вас нету аккаунта?
          <span 
            class="link_send"
            @click="changeActiveLogin(false)"
          >
            Зарегистрироваться
          </span>
        </div>

      </form>
    </div>

    <div 
      class="personal_account-register"
      v-else
    >
      <form class="form" @submit.prevent="signup">
        <div class="form_title">
          Регистрация
        </div>
        <div class="form_email">
          <InputText
            v-model="signupForm.first_name"
            label="Имя"
            :required="true"
          />
          <InputText
            v-model="signupForm.last_name"
            label="Фамилия"
            :required="true"
          />
          <InputText
            label="Email"
            :required="true"
            v-model="signupForm.email"
          />
          <InputText 
            v-model="signupForm.password"
            label="Пароль"
            :required="true"
            type="password"
            :password="true"
          />
         <div 
          v-if="error"
          class="error"
        >
           {{ error }}
         </div>
        </div>
        <div class="form_description">
          <p class="form_description-item">
            Ваши личные данные будут использоваться 
            для упрощения вашего дальнейшего взаимодействия с сайтом, 
            управления доступом к вашему аккаунту и других целей, 
            описанных в документе 
            <span 
              class="form_description-link"
              @click="sendPolicyPage"
            >
              политика конфиденциальности.
            </span>
          </p>
        </div>
        <button class="form_button">
          Регистрация
        </button>
        <div 
          class="link"
          @click="changeActiveLogin(true)"
        >
          У вас есть аккаунт?
          <span class="link_send">
            Войти
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { RouteName } from '../router/utils'
import InputText from './InputText.vue'
export default {
  components: { InputText },
  name: 'PersonalAccount',
  data () {
    return {
      loginActive: true,
      form: {
        email: '',
        password: '',
        password_remember: ''
      },
      signupForm: {
        email: '',
        password: '',
        first_name: "",
        last_name: "",
        billing: {
          phone: ""
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      error: 'account/getAuthError'
    })
  },
  methods: {
    sendPolicyPage () {
      this.$router.push({
        name: RouteName.PrivacyPolicy
      })
    },
    login () {
      this.$store.dispatch('account/login', this.form)
    },
    signup () {
      this.$store.dispatch('account/signup', this.signupForm)
    },
    changeActiveLogin(toggle) {
      this.loginActive = toggle
    },
    changePassword () {
      this.$router.push({
        name: RouteName.PasswordRecovery
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .personal_account {
    padding: 0 30px;
    padding-bottom: 100px;

    &-register {
      .form {
        max-width: 600px;

        &_description {
          &-item {

          }

          &-link {
            text-decoration: underline;
            cursor: pointer;
          }
        
        }
      }
    }

    &-login {

      .form {
        max-width: 600px;

        &_password-remember {
          padding: 30px 0;
        }

      }
    }
    
    .form_title {
      padding: 30px 0;
      font-size: 25px;
    }

    .form_button {
      padding: 15px 30px;
      font-size: 20px;
      border: none;
      border-radius: 0;
      color: #fff;
      background-color: #b12a2f;
      letter-spacing: 2px;
      cursor: pointer;
    }
  }

  .link {
    padding: 30px 0;

    &_send {
      cursor: pointer;
      color:#4c8af6;
    }
  }

  .error {
    color: #b12a2f;
    font-size: 14px;
  }

</style>