<template>
  <div class="input">
    <label class="input_label">
      {{ label }}
      <span 
        class="input_label-required"
        v-if="required"
      >
        *
      </span>
    </label>

    <b-form-input
      v-if="mask"
      :list="list"
      :id="id"
      class="input_input"
      :value="value"
      :type="getType"
      :placeholder="placeholder"
      :required="required"
      @input="handle($event)"
      autocomplete="off"
      v-mask="mask"
    ></b-form-input>
    <b-form-input
        v-else
        :list="list"
        :id="id"
        class="input_input"
        :value="value"
        :type="getType"
        :placeholder="placeholder"
        :required="required"
        @input="handle($event)"
        autocomplete="off"
      ></b-form-input>
    <!--Если тип password-->
    <div 
      class="input_password-visibility"
      v-if="password"
    >
      <span 
        v-if="passwordVisibility == 'password'"
        class="material-icons"
        @click="changePasswordVisibility('text')"
      >
        visibility
      </span>
      <span 
        v-else
        class="material-icons"
        @click="changePasswordVisibility('password')"
      >
        visibility_off
      </span>
    </div>
  </div>
</template>
<script>

import { mask } from 'vue-the-mask';

export default {
  name: 'InputText',
  directives: {
    mask
  },
  data () {
    return {
      passwordVisibility: 'password'
    }
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
    id: {
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
    list: {
      type: String,
      default: ''
    },
    password: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    mask: {
      type: [Array, String],
      default: ''
    }
  },
  computed: {
    getType () {
      return this.password ? this.passwordVisibility : this.type
    }
  },
  methods: {
    handle (event) {
      this.$emit('input', event)
    },
    changePasswordVisibility (status) {
      this.passwordVisibility = status
    }
  }
}
</script>
<style lang="scss" scoped>
  .input {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    position: relative;

    &_input {
      padding: 10px 10px;
      font-size: 16px;
      margin-top: 10px;
      border: 1px solid #dadada;
      border-radius: 5px;
    }

    &_password-visibility {
      cursor: pointer;
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: #b12a2f;

      span {
        font-size: 27px;
      }
    }

    &_label {
      color: #121212;
      font-size: 16px;
      font-weight: 600;

      &-required {
        color: #b12a2f;
      }
    }
  }
</style>