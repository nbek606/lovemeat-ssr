import { wooApi } from '@/plugins/wooApi' 

export default class favoriteApiService {
  static create (data, token) {
    return wooApi(`wishlist/create?jwt=${token}`, 'post', data)
  }

}