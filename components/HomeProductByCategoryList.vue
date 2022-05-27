<template>
  <div>
    <BasePage v-if="list.length > 0">
      <div 
        class="category content_layout"
      >
        <div>
          <div 
            class="category_header"
            v-if="index == 0"
          >
            <div class="category_header-left">
              <div 
                class="name"
              >
                {{ itemTitle }}
              </div>
            </div>
          </div>
          <div>
            <ProductList
              :list="list"
              :max="max"
            />
          </div>
        </div>
      </div>
    </BasePage>
     <BasePage v-else>
       <div class="category_header">
        <div class="category_header-left">
          <div 
            class="name"
          >
            {{ itemTitle }}
          </div>
        </div>
      </div>
      <ProductListMaket
        :max="4"
        page="default"
      />
    </BasePage>
  </div>
</template>
<script>

/* import components */
import ProductList from '@/components/ProductList.vue'
import BasePage from '@/components/BasePage.vue'
import ProductListMaket from './ProductListMaket.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeProductByCategoryList',
  provide: {
    page: 'default'
  },
  components: {
    ProductList,
    BasePage,
    ProductListMaket
  },
  props: {
    max: {
      type: [Number, String],
      required: true
    },
    list: {
      type: [Object, Array],
      required: true
    },
    index: {
      type:[Number, String],
      required: true
    }
  },
  mounted () {
    this.getList()
  },

  data () {
    return {
    
    }
  },
  computed: {
    ...mapGetters({
      globalProductList: 'product/getGlobalProduct'
    }),
    itemTitle () {
      return `Хиты на lovemeat.ru`
    }
  },

  methods: {
    getList () {
     
    },
  }
}
</script>
<style lang="scss" scoped>
  .category {
    &_maket {
      padding: 0 30px;
    }

    &_position {
      text-decoration: underline;
      cursor: pointer;
      color: #000000;

      transition: all 0.5s;

      &:hover {
        color: #810c0c;
      }
    }

    &_header {
      display: flex;
      padding: 30px 0;

       @media (max-width: 765px) {
         flex-direction: column;
       }

      &-left {
        margin-right: auto;
        display: flex;
        

        .name {
          font-weight: 600;
          padding-right: 30px;
          color: #1f1f1f;
        }

        .all_view {
          text-decoration: underline;
           color: #1f1f1f;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
        }
      }

      &-right {
        display: flex;
        flex-wrap: wrap;

        &-item {
          padding-left: 25px;
          
          @media (max-width: 765px) {
            padding-left: 0;
            padding-right: 25px;
            padding-top: 10px;
          }

          color: #1f1f1f;
          cursor: pointer;
          transition: all 0s ease 0s;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>