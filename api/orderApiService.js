import { wooApi } from '@/plugins/wooApi' 

const uri = 'orders'

export default class productApiService {
  static createOrder (data) {
    return wooApi(uri, 'post', data)
  }
  
  static getOrderByAccount (accountId, currentPage = 1, perPage = 10) {
    return wooApi(`${uri}?customer=${accountId}&page=${currentPage}&per_page=${perPage}`, 'get')
  }

  static getOrderById (id) {
    return wooApi(`${uri}/${id}`, 'get')
  }

  static update (id, data) {
    return wooApi(`${uri}/${id}`, 'put', data)
  }
}