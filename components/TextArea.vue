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
    <b-form-textarea
      :id="id"
      class="input_input"
      :value="inputText"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      @input="handle($event)"
      autocomplete="off"
    ></b-form-textarea>
  </div>
</template>
<script>
export default {
  name: 'InputText',
  data () {
    return {
      inputText: ''
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
    }
  },
  methods: {
    handle (event) {
      this.inputText = event
      this.$emit('input', this.inputText)
    }
  }
}
</script>
<style lang="scss" scoped>
  .input {
    display: flex;
    flex-direction: column;
    padding: 10px 0;

    &_input {
      padding: 10px 10px;
      font-size: 16px;
      margin-top: 10px;
      border: 1px solid #dadada;
      border-radius: 5px;
      min-height: 80px;
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