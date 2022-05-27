<template>
  <div class="product_maket-item">
    <div class="product">
      <div class="product_left">
        <div class="product_left-img">
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
      <div class="product_right">
        <div class="product_right-favorite">
        </div>

        <div class="product_right-cart">
          <div class="product_right-cart-price">
          </div>
          <div class="product_right-cart-weight">
            <div class="minus">
            </div>
            <div class="count">
            </div>
            <div class="plus">
            </div>
          </div>
        </div>
        <div class="product_right-properties">
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    </div>
    <div class="product_maket-item-bottom">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductMaket'
}
</script>
<style lang="scss" scoped>
  .product_maket-item {
    box-sizing: border-box;
    padding-bottom: 30px;

    &-bottom {
      width: 100%;
      height: 200px;
      background-color: #e9e9e9;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-title {
      height: 40px;
      width: 200px;
      background-color: #e9e9e9;
      margin-bottom: 20px;
    }

    .product {
      width: 100%;
      display: flex;

      @media(max-width:800px) {
        flex-direction: column;
      }


      &_right {
         width: 280px; 
         padding: 0 30px;
        
        @media (max-width: 800px) {
          padding: 30px 0;
        }

         &-favorite {
           height: 30px;
           width: 100%;
           background-color: #e9e9e9;
         }

         &-cart {
           &-price {
             height: 30px;
             width: 100%;
             background-color: #e9e9e9;
             margin: 20px 0;
           }

           &-weight {
             display: flex;

             .minus, .plus {
               width: 50px;
               height: 30px;
               background-color: #e9e9e9;
             }

             .count {
               width: calc(100% - 140px);
               height: 30px;
               background-color: #e9e9e9;
               margin: 0 20px;
             }
           }
         }

         &-properties {
          width: 100%;
          height: 200px;
          background-color: #e9e9e9;
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
         }
      }

      &_left {
        width: 40%;

        @media(max-width:1150px) {
           width: 50%;
        }

        @media(max-width:1024px) {
           width: 60%;
        }

        @media (max-width: 800px) {
          width: 100%;
        }

        &-img {
          width: 100%;
          height: 450px;
          background-color: #e9e9e9;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          @media (max-width: 450px) {
            height: 300px;
          }
        }
      }
    }
  }
</style>