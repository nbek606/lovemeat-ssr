<template>
  <div class="address_input">
    <InputText
      :list="`${id}_autocomplate`"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      :label="label"
      :value="value"
      :id="id"
      @input="handle"
    />

    <datalist :id="`${id}_autocomplate`">
      <option  
        v-for="(item,index) in address.suggestions" 
        :key="index"
      >
        {{ item.value }}
      </option>
    </datalist>
  </div>
</template>
<script>
import InputText from './InputText.vue'
import _ from 'lodash';

export default {
  name: 'InputAutocomplateAddress',
  components: {
    InputText
  },
  props: {
    inputClass: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    city: {
      type: String,
      default: 'Москва'
    },
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
  },

  data () {
    return {
      address: []
    }
  },

  methods: {
    handle (text) {
      this.$emit('input', text)
      this.getAddress(text)
    },

    getAddress: _.debounce(function (query)  {
      query = `${this.city} ${query}`
      var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
      var token = "65878c725af9f1a8ffd84074ade5ac278fd82b50";

      var options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
      };

      fetch(url, options)
          .then(response => response.text())
          .then(result => (
              this.address = JSON.parse(result)
          ))
          .catch(error => console.log("error", error));

    },   300),
  }
}
</script>