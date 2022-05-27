<template>
  <div>
    <h1 class="global_title">Профиль</h1>
    <form class="profile_form" @submit.prevent="send">
      <div class="profile_form-name">
        <InputText
          v-model="form.first_name"
          placeholder="Имя"
          label="Имя"
        />

        <InputText
          v-model="form.last_name"
          placeholder="Фамилия"
          label="Фамилия"
        />
      </div>
      <div class="profile_form-city">
         <InputSelect
            v-model="form.billing.city"
            label="Город"
            :options="$jsonService.cities"
          />
      </div>
      <div class="profile_form-address">
        <InputAutocomplateAddress 
          id="address_1"
          v-model="form.billing.address_1"
          placeholder="Адрес"
          label="Адрес платежа"
          :city="form.billing.city"
          key="address_1"
        />

        <InputAutocomplateAddress 
          id="address_2"
          v-model="form.shipping.address_1"
          placeholder="Адрес доставки"
          label="Адрес доставки"
          :city="form.billing.city"
          key="address_2"
        />
        
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
      </div>
      <div class="profile_form-address">
        <InputText 
          v-model="form.billing.phone"
          placeholder="+7 (967) 018-37-77"
          label="Телефон"
          :mask="['+7 (###) ###-##-##']"
        />
      </div>
      <div class="message">
        <div 
          v-if="message.success.show"
          class="message_success"
        >
          {{ message.success.value }}
        </div>
        <div 
          v-if="message.error.show"
          class="message_error"
        >
          {{ message.error.value }}
        </div>
      </div>

      <button class="profile_form-button">
        Обновить
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import InputAutocomplateAddress from './InputAutocomplateAddress.vue'
import InputSelect from './InputSelect.vue'
import InputText from './InputText.vue'

export default {
  components: { InputText, InputAutocomplateAddress, InputSelect },
  name: 'PersonalAccountPageProfile',
  mounted () {
    this.mergeForm(this.form, this.account)
    this.getAddressProfile()
  },
  data () {
    return {
      properties: {
        etzh: '',
        kv: '',
        df: '',
        pd: ''
      },
      message: {
        error: {
          value: 'Произошла ошибка при обновлении вашего профиля',
          show: false
        },
        success: {
          value: 'Ваш профиль успешно обновлен',
          show: false
        }
      },
      loader: false,
      form: {
        first_name: '',
        last_name: '',
        billing: { 
          first_name: "",
          last_name: "",
          company: "",
          address_1: "",
          city: "",
          postcode: "",
          country: "", 
          state: "", 
          phone: "" 
        },
        shipping: {
          address_1: ''
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      token: 'account/getAccountToken',
      account: 'account/getAccountData'
    }),

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
      return `${ this.form.shipping.address_1} ${this.pd} ${this.etzh} ${this.kv} ${this.df}`
    }
  },

  methods: {
    getAddressProfile() {
       this.properties = this.$profileService.addresProperties(this.form.shipping.address_1)
    },
    send () {
      this.form.billing.first_name = this.form.first_name 
      this.form.billing.billing_name = this.form.first_name
      this.form.billing.last_name = this.form.last_name 
      this.form.shipping = {
          first_name: this.form.billing.first_name,
          last_name: this.form.billing.last_name,
          company: this.form.billing.company,
          address_1: this.homeProperties,
          city: this.form.billing.city,
          postcode: this.form.billing.postcode,
          country: this.form.billing.country, 
          state: this.form.billing.state, 
          phone: this.form.billing.phone 
      }

      //включаем loader
      this.loader = true

      this.$accountApiService.update(this.account.id, this.form, this.token).then((response) => {
        this.loader = false
        this.message.success.show = true
        this.$store.dispatch('account/account', response.data)
      }).catch(() => {
        this.message.error.show = true
      })
    },

    mergeForm (form, account) {
      Object.keys(form).forEach(key => {
        if (form[key] instanceof Object) {
          this.mergeForm(form[key], account[key])
        } else {
          if (form[key] != undefined) {
            form[key] = account[key]
          }
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  .profile_form {
    max-width: 500px;
    padding-bottom: 100px;

    &-button {
      padding: 10px 20px;
      border: none;
      color: #fff;
      background-color: #b12a2f;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }
    
    .message {
      padding: 20px 0px;

      &_success {
        color: #7a9c31;
      }

      &_error {
        color: #b12a2f;
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