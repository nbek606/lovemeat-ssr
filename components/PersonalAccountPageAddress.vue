<template>
  <div class="address">
    <div class="address_title">
      Следующие адреса будут использованы по умолчанию при оформлении заказов.
    </div>
    <div 
      class="address_item"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="address_item-title">
        {{ item.title }}
      </div>

      <div class="address_item-value">
        {{ item.value }}
      </div>      

      <div 
        class="address_item-edit"
        @click="edit"
      >
        Изменить
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PersonalAccountPageAddress',
  computed: {
    ...mapGetters({
      account: 'account/getAccountData'
    }),
    list () {
      return [
        {
          title: 'Платёжный адрес',
          value: this.account.billing.address_1
        },
        {
          title: 'Адрес доставки',
          value: this.account.billing.address_2
        }
      ]
    }
  },
  methods: {
    edit () {
      this.$emit('edit-address')
    }
  }
}
</script>
<style lang="scss" scoped>
  .address {
    padding-top: 30px;

    &_title {
      font-size: 16px;
      padding-bottom: 30px;
    }

    &_item {
      padding: 15px 0;

      &-title {
        font-weight: 600;
        font-size: 20px;
        padding: 5px 0;
      }

      &-edit {
        padding: 5px 0;
        text-decoration: underline;
        color: #b12a2f;
        cursor: pointer;
      }
    }
  }
</style>