import menuApiService from '@/api/menuApiService'
import productApiService from '@/api/productApiService'
import pageApiService from '@/api/pageApiService'
import productService from '@/services/productService'
import jsonService from '@/services/jsonService'
import contactApiService from '@/api/contactApiService'
import orderApiService from '@/api/orderApiService'
import dateService from '@/services/dateService'
import accountApiService from '@/api/accountApiService'
import favoriteApiService from '@/api/favoriteApiService'
import reviewService from '@/services/reviewService'
import siteMapService from '@/services/siteMapService'
import userApiService  from '@/api/userApiService'
import profileService from '@/services/profileService'


export default ({ app }, inject) => {
  inject('menuApiService', menuApiService)
  inject('menuApiService', menuApiService)
  inject('productApiService', productApiService)
  inject('productService', productService)
  inject('jsonService', jsonService)
  inject('pageApiService', pageApiService)
  inject('orderApiService', orderApiService)
  inject('dateService', dateService)
  inject('accountApiService', accountApiService)
  inject('favoriteApiService', favoriteApiService)
  inject('reviewService', reviewService)
  inject('siteMapService', siteMapService)
  inject('userApiService', userApiService)
  inject('profileService', profileService)
  inject('contactApiService', contactApiService)
}
