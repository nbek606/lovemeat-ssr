import { tokenApi } from '@/plugins/tokenApi'
import { api } from '@/plugins/api'
import adminData from '../assets/temp/admin.json'

/* const uri = 'wp-json/wp/v2/users' */

export default class userApiService {
  static getToken () {
    return tokenApi('/wp-json/jwt-auth/v1/token', 'post', {
      username: adminData.username,
      password: adminData.password
    })
  }

  static resetPassword (data) {
    return api('/wp-json/simple-jwt-login/v1/user/reset_password', 'post', data)
  }
  
}
