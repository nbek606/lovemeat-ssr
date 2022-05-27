<template>
  <div 
    class="breadcrumb"
    id="breadcrumb"
  >
    <div 
      v-for="(item, index) in list"
      :key="index"
      class="breadcrumb_list"
    >
      <span 
        class="breadcrumb_list-item"
        :class="{'breadcrumb_list-item-active':item.url}"
        @click="send(item)"
      >
        {{ item.title }}
      </span>
      <span 
        class="breadcrumb_list-arrow material-icons"
        v-if="item.url"
      >
        arrow_forward
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Breadcrumbs',
  props: {
    list: {
      type: [Object, Array],
      required: true
    }
  },
  methods: {
    send (item) {
      let url = {}
      if (item.params) {
        url = {
          name: item.url,
          params: item.params
        }
      } else {
        url = {
          name: item.url
        }
      }

      this.$router.push(url)
    }
  }
}
</script>
<style lang="scss" scoped>
  .breadcrumb {
    display: flex;
    align-items: center;
    padding: 30px 0;
    flex-wrap: wrap;
    background-color: transparent;

    &_list {
      display: flex;

      &-item {
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #7e7e7e;
        cursor: pointer;
        transition: all 0.5s;
        padding-bottom: 10px;

        &:hover {
          color: #b12a2f;
        }

        &-active {
          color: #1f1f1f;
          font-weight: 600;
          text-decoration: underline;
        }
      }

      &-arrow {
        font-size: 16px;
        padding: 0 10px;
        margin-top: 6px;
        color: #7e7e7e;
      }
    }
  }
</style>