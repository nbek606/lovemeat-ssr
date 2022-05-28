import productApiService from "@/api/productApiService"
import globalCategory from '@/assets/temp/globalCategory.json'
import categories from '@/assets/temp/categories.json'

const state = {
  categories: false,
  globalProduct: [],
  productDataLoader: false,
  collectionProduct: [],
  underProductList: [],
  productList: []
}

const getters = {
  getCategories: state => state.categories,
  getGlobalProduct: state => state.globalProduct,
  getProductDataLoader: state => state.productDataLoader,
  getUnderProductList: state => state.underProductList,
  getCollectionProduct: state => state.collectionProduct,
  getProductList: state => state.productList
}

const actions = {
  productList ({ commit }, payload) {
    commit('setProductList', payload)
  },
  //получаем категории
  categories ({ commit  }) {
    commit('setCategories', categories)
    productApiService.getCategories().then((response) => {
      commit('setCategories', response.data)
    })
  },

  globalProduct({ commit }, payload) {
    commit('setGlobalProduct', payload)
  },

  //загрузка в момент загрузки данных
  productDataLoader ({ commit }, payload) {
    commit('setProductDataLoader', payload)
  },

  underProductList ({ commit }, payload) {
    commit('setUnderProductList', payload)
  },

  collectionProduct ({ commit }, payload) {
    commit('setCollectionProduct', payload)
  }
}

const mutations = {
  setProductList (state, payload) {
    const itemProduct = state.productList.find(item => item.id == payload.id)
    
    if (itemProduct) {
      state.productList = state.productList.filter(item => item.id != payload.id)
      state.productList.push(payload)
    } else {
      state.productList.push(payload)
    }
  },
  setCollectionProduct (state, payload) {

    const list = state.collectionProduct.find(item => item.slug == payload.slug)

    /* если существует */
    if (list) {
      
      if (list.list == undefined) {  
        list.list = {}
      }

      const listPage = list.list[payload.page]

      if (listPage) {
        list.list[payload.page] = payload.list
      } else {

        list.list[payload.page] = payload.list
        
        //Убираем из списка текущий элемент
        const collectionProductList = state.collectionProduct.filter(item => item.slug != list.slug)

        //Записываем измененный элемент
        collectionProductList.push(list)
        
        state.collectionProduct = collectionProductList
      }
     
    /* если не существует */  
    } else {
      const resultList = {}
      
      resultList[payload.page] = payload.list

      state.collectionProduct.push({
        slug: payload.slug,
        list: resultList,
        countPage: payload.countPage
      })
    }
  },

  setCategories(state, payload) {
    const unnecessary = ['gastronomiya', 'misc']
    const categories = globalCategory
    const sortCategories = payload.filter(item => !unnecessary.includes(item.slug))
    const newCategories = []

    categories.forEach(item => {
      const category = sortCategories.find((category) => category.slug == item)
      if (category != undefined) {
        newCategories.push(category)
      }
      
    })

    state.categories = newCategories
  },

  setGlobalProduct(state, payload) {
    state.globalProduct = payload
  },

  setUnderProductList (state, payload) {

    const itemList = state.underProductList.find(item => item.category.id != payload.category.id)

    if (itemList) {
      state.underProductList = state.underProductList.filter(item => item.category.id != payload.category.id)
      state.underProductList.push(payload)
    } else {
      state.underProductList.push(payload)
    }
  },
  
  setProductDataLoader (state, payload) {
    state.productDataLoader = payload
  },

  setAllProduct (state, payload) {
    state.allProduct = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}