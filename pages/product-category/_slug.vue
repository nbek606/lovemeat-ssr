<template>
    <div
      class="collections"
      id="page"
    >
      
      <div class="content_layout">
        <div class="collections_breadcrumbs">
          <Breadcrumbs 
            :list="breadcrumbs()"
          />
        </div>
        <div class="collections_title global_title">
          <span>
          {{ category.name }}
          </span>

          <div 
            class="collections_mobile-filter"
            @click="showMobileFilter()"
          >
            <img :src="require(`@/assets/icons/png/filter.png`)"/>
          </div>
        </div>
        <!--фильтр-->
        <transition name="fade">
          <div
            id="collections_filter"
          >
            <div 
              class="collections_filter"
              :class="[
                      { pointer_none: productLoader },
                      {'filter_active': mobileFilterShow }
                    ]"
              v-if="!$jsonService.filterHide.includes(category.slug)"
            >
              <div 
                class="filter_group"
                :class="{'filter_group-active': mobileFilterShow }"
              >
                <div 
                  class="filter_group-item"
                  v-for="(item, index) in filterOptions"
                  :key="index"
                >
                  <input
                    class="filter_group-item-input custom-checkbox"
                    type="checkbox"
                    :id="`filter_group-item-input${index}`"
                    @change="changeAttribute(item.id, item.key)"
                    :checked="attributeTerms[item.key]"
                  />
                  <label
                    :for="`filter_group-item-input${index}`"
                    class="filter_group-item-title"
                  >
                    {{ item.name }}
                  </label>
                </div>
              </div>
              <div 
                class="filter_group"
                :class="{'filter_group-active': mobileFilterShow }"
              >
                <div 
                  class="filter_group-item"
                  :class="{ view_all:item.value == 'all' }"
                  v-for="(item, index) in filterSale"
                  :key="index"
                  @click="changeTags(item.orderby, item.value)"
                >
                  {{ item.name }}
                </div>
              </div>
          
              <div 
                class="filter_select"
                :class="{'filter_group-active': mobileFilterShow }"
              >
                <div 
                  class="filter_select-title"
                  @click="toggleDropdown = !toggleDropdown"
                >
                  <span class="text">
                    {{  filterItem  }}
                  </span>
                  <span class="icon">
                    
                  </span>
                </div>
              
                <div 
                  class="filter_select-dropdown"
                  :class="{ dropdown_active:toggleDropdown }"
                >
                  <div 
                    class="filter_select-dropdown-item"
                    v-for="(item, index) in filterSelectOptions"
                    :key="index"
                    @click="changeSelectFilter(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <!--лист-->
        <div 
          class="collections_list"
          id="collections_list"
        >
            <ProductListMaket
              :max="perPage"
              v-if="productList.length == 0 && productLoader"
            />

            <ProductList
              v-else
              :list="productList"
              :max="perPage"
            />
            
            <div
              v-if="productList.length == 0 && !productLoader && productList != undefined"
              class="collections_empty"
              >
              Количество товаров: 0
            </div>

            <Pagination
              v-if="maxPage > 1"
              :current-page="currentPage"
              :max-page="maxPage"
              @change-page="changePage"
            />
         </div>
          <div 
            class="collections_description"
            id="collections_description"
          >
            <div v-html="category.description" />
          </div>
      </div>
      <!--виджеты-->
      <RibbonAbout
        :list="$jsonService.ribbonAbout.afterProductItem"
      />
      <div class="collections_widget content_layout">
        <HomeRecipesWidget />
        <HomeBlogWidget />
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { RouteName } from '@/router/utils'

/* import components */
import ProductList from '@/components/ProductList.vue'
import Breadcrumbs from '@/layouts/Breadcrumbs.vue';
import Pagination from '@/components/Pagination.vue';
import RibbonAbout from '@/components/RibbonAbout.vue';
import HomeRecipesWidget from '@/components/HomeRecipesWidget.vue';
import HomeBlogWidget from '@/components/HomeBlogWidget.vue';
import ProductListMaket from '@/components/ProductListMaket.vue'

export default {
  name: 'CollectionByCategory',
  provide: {
    page: 'collections'
  },
  components: {
    ProductList,
    Breadcrumbs,
    Pagination,
    RibbonAbout,
    HomeRecipesWidget,
    HomeBlogWidget,
    ProductListMaket
  },

  data () {
    return {
      productList: [],
      attributeTerms: {
        boil: false,
        grill: false,
        bake: false,
        fry: false,
        stew: false
      },
      attributeTermsIds: [],
      toggleDropdown: false,
      mobileFilterShow: false,
      filterItem: 'По умолчанию',
      perPage: 16,
      maxPage: 0,
      currentPage: 1,
      order: 'asc',
      orderby: 'menu_order',
      scrollId: 'scroll_top',
      itemTag: 'hit',
      filterOptions: [
        {
          name: "Варить",
          key: "boil",
          id: '22'
        },
        {
          name: "Гриль",
          key: "grill",
          id: '25'
        },
        {
          name: "Жарить",
          key: "fry",
          id: '24'
        },
        {
          name: "Запекать",
          key: "bake",
          id: '23'
        },
        {
          name: "Тушить",
          key: "stew",
          id: '21'
        }
      ],

      filterSale: [
        {
          name: "Хит",
          value: "tag",
          orderby: "hit"
        },
        {
          name: "Товар дня",
          value: "tag",
          orderby: "product-day"
        },
        {
          name: "Скидки",
          value:"dicsount",
          orderby: 'on_sale'
        },
        {
          name: "Показать все",
          value: "all",
          orderby: 'menu_order'
        }
      ],

      filterSelectOptions: [
        {
          name: "По популярности",
          value: "popularity",
          order: 'asc'
        },
        {
          name: "По цене (по убыванию)",
          orderby: "price",
          order: 'desc'
        },
        {
          name: "По цене (по возрастанию)",
          orderby: "price",
          order: 'asc'
        }
      ]
    }   
  },

  mounted () {
    this.getList()
  },

  //метаданные
  head () {
    if(this.category) {
      return {
        title: this.category.yoast_head_json.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.category.yoast_head_json.description
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: this.category.yoast_head_json.og_description
          }
        ]
      }
    }
  },
  watch: {
    $route () {
      this.changeParams()
      this.clearAttributes()
      this.getList()
    },
    category: {
      handler (val) {
        if (val) {
          this.changeParams()
          this.clearAttributes()
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      categories: 'product/getCategories',
      productLoader: 'product/getProductDataLoader',
      collectionProduct: 'product/getCollectionProduct'
    }),

    category () {
      if (!this.categories) {
        return false
      }

      return this.categories.find(item => item.slug== this.$route.params.slug)
    },
    slug () {
      return this.$route.params.slug
    },
  },

  methods: {
    changeAttribute (id, key) {
      this.attributeTerms[key] = !this.attributeTerms[key]
      
      if (this.attributeTerms[key]) {
        this.attributeTermsIds.push(id)
      } else {
        this.attributeTermsIds = this.attributeTermsIds.filter(item => item != id)
      }

      this.orderby = 'menu_order',
      this.order = 'asc'
      this.currentPage = 1
      this.productList = []

      if (this.isAttributes()) {
        this.getByAttributeTerms()
      } else {
        this.queryGetList()
      }
    },

    isAttributes () {
        let bool = false

        Object.keys(this.attributeTerms).forEach((item) => {
          if(this.attributeTerms[item]) {
            bool = true
          }
        })

        return bool
    },

    clearAttributes () {
      Object.keys(this.attributeTerms).forEach((item) => {
        this.attributeTerms[item] = false
      })
    },

    showMobileFilter () {
      this.mobileFilterShow = !this.mobileFilterShow
    },
    changePage (page) {
      this.currentPage = page

      if (this.orderby == 'tag') {
        this.getByTags()
      } else {
        this.productList = []
        this.getList();
        this.$productService.scrollPageTop(this.scrollId)
      }
    },
    
    //Получаем список
    getList () {
        
        const itemProductList = this.collectionProduct.find(item => item.slug == this.category.slug)
        
        this.productList = []
        
        if (itemProductList && itemProductList.list[this.currentPage]) {
          this.productList =  this.$productService.cloneArray(itemProductList.list[this.currentPage])
          this.maxPage = itemProductList.countPage
        }

        this.queryGetList()
    },

    //Запрос на бекенд
    queryGetList () {
        this.$store.dispatch('product/productDataLoader', true)

        this.$productApiService.getProductByCategoryId(this.category.id, this.perPage, this.currentPage, this.order,this.orderby).then((response) => {
          
          if (this.orderby == 'menu_order') {
            this.setCollectionProduct(response)
          }

          if (this.productList.length == 0) {
            this.productList = response.data
          }

          this.maxPage = response.headers['x-wp-totalpages']
          
          this.$store.dispatch('product/productDataLoader', false)
        }).catch(() => {
           this.$store.dispatch('product/productDataLoader', false)
        })
    },

    getByTags () {
      this.productList = []
      this.$store.dispatch('product/productDataLoader', true)
      this.$productApiService.getProductTagBySlug(this.itemTag).then((response) => {
        const list = response.data.find(item => item.slug == this.itemTag)

        if (list) {
          this.$productApiService.getProductByTagId(list.id, this.category.id, this.perPage, this.currentPage).then((response) => {
            this.productList = response.data
            this.maxPage = response.headers['x-wp-totalpages']
            this.$store.dispatch('product/productDataLoader', false)
          })
        }
      }).catch(() => {
        this.$store.dispatch('product/productDataLoader', false)
      })
    },

    getByAttributeTerms () {
      this.$store.dispatch('product/productDataLoader', true)

      if (this.attributeTermsIds.length > 0) {
        this.$productApiService.getProductByAttributTerm(this.category.id, this.attributeTermsIds, this.perPage, this.currentPage).then((response) => {
          this.productList = response.data
          this.maxPage = response.headers['x-wp-totalpages']
          this.$store.dispatch('product/productDataLoader', false)
        }).catch(() => {
          this.$store.dispatch('product/productDataLoader', false)
        })
      }
    },

    //Записывем данные в store
    setCollectionProduct (response) {
      let collection = {}

      let saveData = this.$productService.cloneArray(response.data)
      
      collection = {
        slug: this.category.slug,
        page: this.currentPage,
        list: saveData,
        countPage: response.headers['x-wp-totalpages']
      }

      this.$store.dispatch('product/collectionProduct', collection)
    },

    changeSelectFilter (item) {
      this.toggleDropdown = !this.toggleDropdown
      this.filterItem = item.name
      this.orderby = item.orderby,
      this.order = item.order
      this.currentPage = 1
      this.productList = []
      this.queryGetList()
    },

    changeTags (val, order = 'tag') {
      this.currentPage = 1
      this.productList = []

      if (order == 'tag') {
        this.orderby = 'tag'
        this.itemTag = val
        this.getByTags()
      } else {
        this.orderby = val
        this.order = 'asc'
        this.clearAttributes()
        this.queryGetList()
      }
    },

    changeParams () {
      this.order = 'asc',
      this.orderby = 'menu_order'
      this.currentPage = 1
    },

    breadcrumbs () {
        return  [
          {
            title: "Главная",
            url: RouteName.Home
          },
          {
            title: this.category.name
          },
        ]
      },
  }
}
</script>
<style lang="scss" scoped>
  .collections {
     min-height: 500px;

     &_mobile-filter {
        margin-left: auto;
        display: inline-block;
        padding-left: 30px;

        @media (min-width:600px) {
          display: none;
        }
     }

     &_empty {
       min-height: 500px;
       font-size: 25px;
     }


    .empty_list {
      font-size: 30px;
      font-weight: 600;
      padding: 30px 30px;
      border-radius: 10px;
      color: #6b6b6b;
      min-height: 400px;
    }

    &_widget {
      padding: 0px 30px;
      box-sizing: border-box;
    }

    &_breadcrumbs {
      padding: 0 30px;
    }
    
    &_list, &_title, &_description {
      padding-left:30px;
      padding-right:30px;
    }

    &_description {
      margin-bottom: 30px;
    }

     &_title {
       padding-top: 0;
       margin-top: 0;
       display: flex;
       justify-content: space-between;
     }

    &_filter{
      width: 100%;
      display: flex;
      background-color: #e9e9e9;
      margin-bottom: 30px;
      transition: all 1s;
      overflow: hidden;

      @media (max-width:1180px) {
        flex-direction: column;
      }

      @media (max-width:600px) {
        max-height: 0;
      }

      .filter_group {
        display: flex;
        padding: 30px;
        border-right: 1px solid #6b6b6b;
        box-sizing: border-box;


        @media (max-width:1180px) {
          width: 100% !important;
          border: none;
          border-bottom: 1px solid #6b6b6b;
          padding-left: 20px;
          justify-content: left !important;
          padding: 30px 30px;
        }

        @media (max-width:600px) {
          flex-direction: column;
          padding: 15px 30px;
        }

        &:last-child {
          border: none;
        }

        .view_all {
          text-decoration: underline;
        }

        &-item {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #000000;
          transition: all 0.5s;

          &:hover {
            color: #810c0c;
          }

         @media (max-width:1180px) {
           padding-right:40px;
         }

         @media (max-width:600px) {
            margin:5px 0;
            
         }


          &-input {
            margin-right: 10px;
            transform: scale(1.3);
            cursor: pointer;
          } 

          &-title {
            color: #000000;
            transition: all 0.5s;

            &:hover {
              color: #810c0c;
            }

            @media (max-width:600px) {
              margin:5px 0;
              flex-wrap: wrap;
            }
          }
        }

        &:nth-child(1) {
          width: 50%;
          flex-wrap: wrap;
          justify-content: space-around;
        }

        &:nth-child(2) {
          width: 30%;
          flex-wrap: wrap;
          justify-content: space-around;

          
          &-item {
            cursor: pointer;
          }
        }
      }
      .filter_select {
        align-items: center;
        padding: 20px;
        width: 250px;
        line-height: 40px;
        box-sizing: border-box;

        @media (max-width:1180px) {
          width: 100%;
          border: none;
          padding-left: 30px;
        }

        @media (max-width:600px) {
   
        }

        &-title {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #000000;
          transition: all 0.5s;

          &:hover {
            color: #810c0c;
          }

          .icon {
            border-radius: 10px;
            position: relative;
            color: #fff;

            &:after {
              content: '';
              position: absolute;
              left: 10px;
              margin-top: -3px;
              border: 8px solid transparent;
              border-top: 8px solid #b12a2f;
            }
          }

          .text {
            
          }
        }

        &-dropdown {
          display: none;
          opacity: 0;
          position: absolute;
          background-color: #b12a2f;
          color: #fff;
          margin-top: 10px;
          z-index: 2;
          margin-right: 10px;

          &-item {
            border-bottom: 1px solid #fff;
            padding: 7px 20px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .dropdown_active {
    display: block !important;
    opacity: 1 !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    width: 0;
    height: 0;
  }
  
  .filter_active {
    max-height: 1000px;
    width: 100%;
  }

  .filter_group-active {
   
  }
</style>