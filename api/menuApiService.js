import { api } from '@/plugins/api' 

const uri = 'wp-json/wp-api-menus/v2/menus'

export default class menuApiService {
  static getMenuList () {
    return api(uri, 'get')
  }

  static getMenuById (id) {
    return api(uri + '/' + id, 'get')
  }
}