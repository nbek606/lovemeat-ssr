<template>
  <div class="password_recovery content_layout">
    <Breadcrumbs
      :list="breadcrumbs"
    />
    <h1 class="global_title">Сбросить пароль</h1>
    
    <form 
      @submit.prevent="send"
      v-if="!success"
    >
      <div class="form_email">
        <InputText
          v-model="form.email"
          placeholder="Email"
          label="Email"
          type="email"
          :required="true"
        />
      </div>
      <div 
        v-if="error.message"
        class="error"
      >
        {{ error.message }}
      </div>
      <button class="from_button">
         Восстановить пароль
      </button>
    </form>
    <div v-else>
      <p>Мы отправили письмо со ссылкой для изменения пароля по адресу <strong>{{ form.email }}</strong> (убедитесь, что оно не попало в папку "Спам") </p>
      <div 
        class="link_send"
        @click="sendAuth"
      >
        Вернуться к входу
      </div>
    </div>
  </div>
</template>
<script>
import InputText from '@/components/InputText.vue'
import Breadcrumbs from '@/layouts/Breadcrumbs.vue'
import { RouteName } from '@/router/utils'
export default {
  name: 'PasswordRecovery',
  components: { InputText, Breadcrumbs },
  data () {
    return {
      form: {
        email: ''
      },
      error: {
        message: ''
      },
      success: false,
      successEmail: ''
    }
  },
  
  //метаданные
  head () {
    return {
      title: 'Восстановление пароля'
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          title: "Главная",
          url: RouteName.Home
        },
        {
          title: "Сбросить пароль"
        }
      ]
    }
  },
  methods: {
    sendAuth () {
      this.$router.push({
        name: RouteName.PersonalAccount
      })
    },
    send () {
      this.$store.dispatch('modal/LOADER_ON')
      this.$userApiService.resetPassword(this.form).then((response) => {
        if (response.data.success) {
          this.success = true
          this.successEmail = this.form.email
          this.form.email = ''
          this.error.message = ''
        }

         this.$store.dispatch('modal/LOADER_OFF')
      }).catch(() => {
        this.error.message = 'Пользователь с таким email не существует'
        this.$store.dispatch('modal/LOADER_OFF')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.password_recovery {
  padding: 0 30px;
  max-width: 600px;
  margin: 0;

  .from_button {
    margin-top: 20px;
    background-color: #b12a2f;
    color: #fff;
    padding: 20px 20px;
    border-radius: 10px;
    color: #fff;
    transition: all 0.5s;
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-size: 18px;
    transition: all 0.5s ease 0s;

    &:hover {
      letter-spacing: 1px;
    }
  }
}


.error {
  color: #b12a2f;
  font-size: 14px;
}

.link {
  padding: 30px 0;

  &_send {
    cursor: pointer;
    color:#4c8af6;
  }
}
</style>