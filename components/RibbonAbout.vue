<template>
  <div class="ribbon"> 
    <div class="ribbon_block content_layout">
      <div 
        class="ribbon_item"
        v-for="(item, index) in sortList"
        :key="index"
      >
      
        <div class="ribbon_item-icon">
          <img :src='require(`@/assets/icons/png/${item.icon}.png`)' />
        </div>
        <div 
          class="ribbon_item-text"
          v-html="item.text"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RibbonAbout',
  props: {
    list: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    sortList () {
      return this.list.slice(0, 3)
    }
  }
}
</script>
<style lang="scss" scoped>
  .ribbon {
    width: 100%;
    background-color: #534a4b;
    color: #fff;
    display: flex;
    box-sizing: border-box;
    font-size: 18px;

    &_block {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 30px 150px;

        @media (max-width: 1024px) {
            padding: 30px 30px;
        }

        @media (max-width: 1024px) {
          padding: 30px 30px;
        }

        @media (max-width: 800px) {
          flex-direction: column;
        }
    }
  

    &_item {
      text-align: center;
      width: 33.3%;

      @media (max-width: 1200px) {
        width: 100%;
        margin-top: 20px;
      }
    

      &-text {
        line-height: 28px;
      }

      &-icon {
        width: 40px;
        margin: auto;

        img {
          width: 100%;
        }
      }
    }
  }
</style>