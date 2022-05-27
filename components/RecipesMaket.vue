<template>
  <div class="recipes_maket">
    <div 
      class="recipes_maket-item"
      v-for="item in max"
      :key="item"
    >
      <div class="recipes_maket-item-img">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
      <div class="recipes_maket-item-title">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecipesMaket',
  props: {
    max: {
      type: [Number, String],
      default: 6
    }
  }
}
</script>
<style lang="scss" scoped>
  .recipes_maket {
    display: flex;
    flex-wrap: wrap;

    &-item {
      width: calc(33% - 30px);
      margin-bottom: 45px;

      @media (min-width: 1024px) {

        &:nth-child(1n) {
          margin-right:45px;
        }

        &:nth-child(3n) {
          margin-right:0;
        }
      }

      @media (max-width: 1024px) {
        margin-top: 45px;
        width: 100%;

        &:nth-child(1) {
            margin-top: 0px;
        }
      }

      &-img {
        width: 100%;
        height: 200px;
        background-color: #e9e9e9;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &-title {
        height: 40px;
        width: 100%;
        background-color: #e9e9e9;
        margin-top: 20px;
      }
    }
  }
</style>