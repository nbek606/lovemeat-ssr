<template>
  <div class="select">
    <label class="select_label">
      {{ label }}
      <span class="select_label-star">
        *
      </span>
    </label>
    <b-form-select
      class="select_select"
      :value="value"
      @input="handle($event)"
    >
      <option 
        v-for="(item, index) in options"
        :key="index"
        :value="item.value"
      >
        {{ item.text }}
      </option>
    </b-form-select>
  </div>
</template>
<script>
export default {
  name: 'InputSelect',
  props: {
    options: {
      type: [Object, Array],
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },

  methods: {
    handle (text) {
      this.$emit('input', text)
    }
  }
}
</script>
<style lang="scss" scoped>
  .select {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    cursor: pointer;

    &_select {
      padding: 10px 10px;
      font-size: 16px;
      margin-top: 10px;
      border: 1px solid #dadada;
      border-radius: 5px;
    }

    &_label {
      font-weight: 600;
      &-star {
        color: #b12a2f;
      }
    }
  }
</style>