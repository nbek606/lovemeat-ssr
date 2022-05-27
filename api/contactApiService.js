import { api } from '@/plugins/api' 

const uri = 'wp-json/contact-form-7/v1/contact-forms'

export default class pageApiService {
  static  requestCall (data) {
    return api(`${uri}/347/feedback`, 'post', data)
  }
}