<template>
  <div class="blog_maket">
    <div 
      class="blog_maket-item"
      v-for="item in max"
      :key="item"
    >
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlogMaket',
  props: {
    max: {
      type: [Number, String],
      default: 2
    }
  }
}
</script>
<style lang="scss" scoped>
  .blog_maket {
    display: flex;

    &-item {
      width: calc(50% - 22.5px);
      height: 200px;
      position: relative;
      background-color: #e9e9e9;
      display: flex;
      justify-content: center;
      align-items: center;
      

      @media (min-width: 800px) {
        &:nth-child(1) {
          margin-right:45px;
        }
      }

      @media (max-width: 800px) {
         width: 100%;
         margin-top: 45px;
      }
    }
  }
</style>