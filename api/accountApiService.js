import { api } from '@/plugins/api'
import { wooApi } from '@/plugins/wooApi'

const uri = 'wp-json/simple-jwt-login/v1'

export default class accountApiService {
  static signup (data) {
    return api(`${uri}/users`, 'post', data)
  }

  static getToken (data) {
    return api(`${uri}/auth`, 'post', data)
  }

  static getByEmail (email) {
    return wooApi(`customers?email=${email}`, 'get')
  }

  static update (customerId,data, token) {
    return wooApi(`customers/${customerId}?jwt=${token}`, 'put', data)
  }

  static setFavorite () {
    return wooApi
  }
}