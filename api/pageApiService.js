import { api } from '@/plugins/api' 

const uri = '/wp-json/wp/v2/pages'

export default class pageApiService {
  static getParentBySlug (slug) {
    return api(`${uri}?slug=${slug}`, 'get')
  }

  static getPagesByParentId (parentId, perPage = 2) {
    return api(`${uri}?parent=${parentId}&per_page=${perPage}`, 'get')
  }

  static getPageById (id) {
    return api(`${uri}/${id}`, 'get')
  }
}