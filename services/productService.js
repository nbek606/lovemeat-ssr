import axios from "axios"

const getProperties = (product) => {
  return {
    calories: product.meta_data.find(item => item.key == 'kkal'),
    proteins: product.meta_data.find(item => item.key == 'protein'),
    fats: product.meta_data.find(item => item.key == 'fat'),
    carbo: product.meta_data.find(item => item.key == 'carbo'),
    storage: product.meta_data.find(item => item.key == 'storage_temp'),
    сookingMethods: product.attributes.find(item => item.name == 'сooking-methods')
  }
}

const getMinMaxWeight = (product) => {
  let volume = {}

  product.meta_data.forEach(item => {
    if (item.key == 'weight_max') {
      volume.max = item
    }

    if (item.key == 'weight_mini') {
      volume.min = item
      if (Number(volume.min.value) / 1000 > 1) {
        volume.min.value = 1
      }
    }
  })

  return volume
}

const changeWeight = (sinfulness, weight) => {
  weight = +weight + sinfulness

  if (weight.toFixed(1) - weight.toFixed(0) == 0) {
    weight = weight.toFixed(0)
  } else {
    weight = weight.toFixed(1)
  }

  return weight
}

const saleType = (product) => {
  return product.meta_data.find(item => item.key == 'sale_type')
}

const salePercent = (product) => {      
    const percent = 100 - (product.price / (product.regular_price / 100))

    return `-${percent.toFixed(0)}`
}

const generateImg = (img, size) => {
  //Проверяем генерировал ли плагин изображение
  if (img.includes('?v=')) {
    const qSymbolSplit = img.split('?')

    let format = '.png'
    const formats = ['png', 'jpeg', 'jpg']

    if (qSymbolSplit[0].includes('.jpeg')) {
      format = '.jpeg'
    }

    if (qSymbolSplit[0].includes('.jpg')) {
      format = '.jpg'
    }
    
    if (formats.includes(format)) {
      return img
    }

    const pngSymbolSplit = qSymbolSplit[0].split(format)

    return `${pngSymbolSplit[0]}-${size}x${size}${format}?${qSymbolSplit[1]}`
  } else {
    return img
  }
}

const scrollPageTop = (id, top = 0) => {
  const el = document.getElementById(id);
  el.scrollIntoView({ top: top });
}

const cloneArray = (data) => {
  let saveData = [...data]
  Object.assign([], saveData)
  return JSON.parse(JSON.stringify(saveData))
}

const cloneObject = (data) => {
  let saveData = {...data}
  Object.assign({}, saveData)
  return JSON.parse(JSON.stringify(saveData))
}

async function getSitemapRoutes () {
    const categories = await axios.get('https://back.lovemeat.ru/wp-json/wc/v3/products/categories?consumer_key=ck_924a8f82c3ebe91af2023b430a9204d2691b3330&consumer_secret=cs_ba22345cfa5c295189cfebb57e467673153ddb16')  
    const products= await axios.get('https://back.lovemeat.ru/wp-json/wc/v3/products?per_page=100&consumer_key=ck_924a8f82c3ebe91af2023b430a9204d2691b3330&consumer_secret=cs_ba22345cfa5c295189cfebb57e467673153ddb16')  
    const categoryList = categories.data.map((category) => `/product-category/${category.slug}`);
    const productList = products.data.map((product) => `/product/${ product.slug }`);
    console.log(productList)
    return [...productList, ...categoryList]
}

export default {
  getSitemapRoutes,
  getProperties,
  getMinMaxWeight,
  changeWeight,
  saleType,
  salePercent,
  generateImg,
  scrollPageTop,
  cloneArray,
  cloneObject
}