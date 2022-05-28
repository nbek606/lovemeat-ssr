import axios from 'axios'

const getXmlFile  = (url, categoryList) => {
  const api = axios
  const xml2js = require('xml2js');

  let listJson = ''

  let listXml = ''

  let removeUrl = [
    'https://lovemeat.ru/my-account/',
    'https://lovemeat.ru/privacy-policy/',
    'https://lovemeat.ru/checkout/',
    'https://lovemeat.ru/cart/'
  ]

  return api.get(url).then((response) => {
    xml2js.parseString(response.data, (err, result) => {
      if(err) {
          throw err;
      }

      const json = JSON.stringify(result, null);

      let list = JSON.parse(json)

      list['urlset'].url.forEach(item => {
        item.loc[0] = `https://lovemeat.ru${item.loc[0].split('https://back.lovemeat.ru')[1]}`
      })

      list['urlset']['url'] =  list['urlset']['url'].filter(item => !removeUrl.includes(item.loc[0]))

      list = getXmlCategories(categoryList, list)

      listJson = JSON.stringify(list)

      let convert = require('xml-js');

      let options = {compact: true, ignoreComment: true, spaces: 4};

      listXml = convert.json2xml(listJson, options)
   });

   return listXml
  })
}

const getXmlCategories = (categoryList, list) => {
  /* 
  
  <url>
    <loc>https://lovemeat.ru/product-category/beef</loc>;
    <lastmod>2022-05-10T14:37:17+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1</priority>
  </url> 
  */

  categoryList.forEach(item => {
    list['urlset']['url'].push({
      changefreq: ['monthly'],
      lastmod: ['2022-05-10T14:37:17+00:00'],
      loc: [`https://lovemeat.ru/product/${item.slug}`],
      priority: ['1']
    })
  })

  return list
}

export default {
  getXmlFile
}