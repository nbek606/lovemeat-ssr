import { wooApi } from '@/plugins/wooApi' 

const uri = 'products'

export default class productApiService {
  static getCategories () {
    return wooApi(uri + '/categories' , 'get')
  }

  static getProductList () {
    return wooApi(uri, 'get')
  }

  static getCategoryById(categoryId) {
    return wooApi(uri + '/categories/' + categoryId, 'get')
  }

  static getProductByCategoryId(categoryId,perPage = 9, currentPage = 1, order = 'asc', orderby='menu_order') {
    return wooApi(`${uri}?per_page=${perPage}&category=${categoryId}&page=${currentPage}&order=${order}&orderby=${orderby}`, 'get')
  }

  static getProductByCategiesBySlug(slug) {
    return wooApi(uri + '/categories?slug=' + slug, 'get')
  }

  static getProductById (productId) {
    return wooApi(uri + '/' + productId, 'get')
  }

  static getProductBySlug (productSlug) {
    return wooApi(uri + '?slug=' + productSlug, 'get')
  }

  static getProductByIds(productIds) {
    return wooApi(`${uri}?include=${productIds}`, 'get')
  }

  static getSearchProductByTitle (searchText, perPage = 100, page = 1) {
    return wooApi(`${uri}?search=${searchText}&per_page=${perPage}&page=${page}`, 'get')
  }

  static getProductTagBySlug(slug) {
    return wooApi(`${uri}/tags?slug=${slug}`, 'get')
  } 

  static getProductByTagId (tagId, categoryId = 0, perPage = 20, currentPage = 1, orderby='menu_order') {
    if (categoryId == 0) {
      return wooApi(`${uri}?orderby=${orderby}&order=asc&tag=${tagId}&per_page=${perPage}`, 'get')
    } else {
      return wooApi(`${uri}?orderby=${orderby}&tag=${tagId}&per_page=${perPage}&category=${categoryId}&page=${currentPage}`, 'get')
    }
  }

  static getProductByAttributTerm (categoryId, terms, perPage = 16, currentPage = 1) {
    return wooApi(`${uri}?category=${categoryId}&attribute=pa_сooking-methods&attribute_term=${terms}&per_page=${perPage}&page=${currentPage}`, 'get')
  }
}