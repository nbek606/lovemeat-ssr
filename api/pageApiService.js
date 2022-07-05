import { api } from '@/plugins/api' 

const uri = '/wp-json/wp/v2/pages'

export default class pageApiService {
  static getParentBySlug (slug) {
    return api(`${uri}?slug=${slug}`, 'get')
  }

  static getPagesByParentId (parentId, currentPage = 1, perPage = 16) {
    return api(`${uri}?parent=${parentId}&page=${currentPage}&per_page=${perPage}`, 'get')
  }

  static getPageBySlug (slug) {
    return api(`${uri}/?slug=${slug}`, 'get')
  }
}