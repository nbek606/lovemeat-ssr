<template>
  <div class="maket_list">
    <div 
      class="maket_list-item"
      :class="{'maket_list-item-fourth': page == 'collections'}"
      v-for="item in max"
      :key="item"
    >
      <div class="maket_list-item-top">
        <div class="maket_list-item-top-img">
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
        <div class="maket_list-item-top-title">

        </div>
        <div class="maket_list-item-top-weight">
          <div class="plus">
          </div>
          <div class="count">
          </div>
          <div class="minus">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductListMaketItem',
  props: {
    max: {
      type: [Number, String],
      default: 4
    },
    page: {
      type: String,
      default: 'collections'
    }
  }
}
</script>
<style lang="scss" scoped>
  .maket_list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    &-item {
      display: flex;
      flex-wrap: wrap;
      width: calc(25% - 34px);
      margin-bottom: 45px;
      min-height: 300px;
      border-radius: 10px;

      &:nth-child(1n) {
        margin-right:45px;
      }

      &:nth-child(4n) {
        margin-right:0;
      }

      @media (min-width: 1024px)  and (max-width:1550px){
        width: calc(33% - 26.8px);

        &:nth-child(1n) {
          margin-right:45px;
        }

        &:nth-child(3n) {
          margin-right:0;
        }

        &:nth-child(4n) {
          display: none;
        }
      }

      @media (max-width: 1024px) {
        width: calc(50% - 22.5px);
        
        &:nth-child(2n) {
          margin-right:0;
        }
      }


      @media (max-width: 765px) {
        width: calc(100%);
        
        &:nth-child(2n + 1) {
          margin-right:0;
        }
      }

      &-top {
        padding: 40px;
        border: 1px solid silver;
        text-align: center;
        width: 100%;

        @media (max-width: 1400px) {
          padding: 20px;
        }

        @media (max-width: 765px) {
          padding: 40px;
        }

        @media (max-width: 450px) {
          padding: 20px;
        }

        &-img {
          background-color: #e9e9e9;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &-title {
          width: 100%;
          height: 40px;
          margin: 20px 0;
          background-color: #e9e9e9;
        }

        &-weight {
          display: flex;

          .plus {
            width: 20px;
            height: 20px;
            background-color: #e9e9e9;
          }

          .count {
            width: calc(100% - 60px);
            height: 20px;
            background-color: #e9e9e9;
            margin: 0 10px;
          }

          .minus {
            width: 20px;
            height: 20px;
            background-color: #e9e9e9;
          }
        }
      }
    }


  &-item-fourth {
    width: calc(25% - 18.8px);

    @media (min-width: 1024px) {
      
      &:nth-child(1n) {
        margin-right:25px;
      }

      &:nth-child(4n) {
        margin-right:0;
        display: flex !important;
      }
    }

    @media (max-width: 1024px) and (min-width: 765px) {
      width: calc(33% - 15px);
      display: flex;
      
      &:nth-child(1n) {
        margin-right:25px;
      }

      &:nth-child(3n) {
        margin-right: 0;
      }     
    }


    @media (max-width: 765px) and (min-width: 600px)  {
      width: calc(50% - 13.5px);
      margin-right: 25px;

      &:nth-child(1n) {
        margin-right:25px;
      }

      &:nth-child(2n) {
        margin-right: 0;
      }
    }


    @media (max-width: 600px) {
      width: 100%;
      margin-right: 0;

      &:nth-child(1n) {
        margin-right:0px;
      }
    }
  }
}

  
</style>