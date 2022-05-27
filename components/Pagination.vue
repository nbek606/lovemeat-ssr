<template>
  <div class="pagination">
    <!--пред-->
    <div 
      class="pagination_prev pagination_item"
      :class="{ disabled: currentPage == 1}"
      @click="changePage(currentPage - 1)"
    >
      <span class="material-icons icon">
        arrow_forward
      </span>
    </div>
    <!--нумерация-->
    <div 
      class="pagination_prev pagination_item"
      :class="{ 'pagination_item-active': currentPage == item }"
      v-for="item in pages"
      :key="item"
      @click="changePage(item)"
    >
      {{ item }}
    </div>
    <!--след-->
    <div 
      class="pagination_next pagination_item"
      :class="{ disabled: currentPage == maxPage}"
      @click="changePage(currentPage + 1)"
    >
      <span class="material-icons icon">
        arrow_forward
      </span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Pagination',
  props: {
    maxPage: {
      type: [ Number, String],
      required: true
    },
    currentPage: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    pages () {
      const pages = []

      if (this.currentPage > 1) {
        pages.push(this.currentPage - 1)
      }

      pages.push(this.currentPage)

      if (this.currentPage != this.maxPage) {
        pages.push(this.currentPage + 1)
      }

      return pages
    }
  },
  methods: {
    changePage (page) {
      this.$emit('change-page', page)
    }
  }
}
</script>
<style lang="scss" scoped>
  .pagination {
    display: flex;
    padding: 30px 0;

    &_item {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      border: 1px solid #b12a2f;
      margin:0 2px;
      color: #b12a2f;
      font-size: 20px;
      color: #b12a2f;
      font-weight: 600;
      cursor: pointer;

      &-active {
        background-color: #b12a2f;
        color: #fff;
      }
    }

    &_prev {
      .icon {
        transform: rotate(180deg);
      }
    }

    .icon {
      font-size: 18px;
    }
  }
</style>