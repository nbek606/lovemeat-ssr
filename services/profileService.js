const addresProperties = (address) => {
  if (address == undefined) {
    return false
  }

  console.log(address)
  
  const textList = address.split('|')

  let kv = textList.find(item => item.includes('кв №')) || ''
  let etzh = textList.find(item => item.includes('этаж:')) || ''
  let df = textList.find(item => item.includes('код домофона:')) || ''
  let pd = textList.find(item => item.includes('подъезд №')) || ''

  kv = kv != '' &&  kv != undefined ? kv.split('кв №:')[1].split(' ')[1] : ''
  etzh = etzh != '' && etzh != undefined ? etzh.split('этаж:')[1].split(' ')[1] : ''
  df = df != '' && df != undefined ? df.split('код домофона:')[1].split(' ')[1] : ''
  pd = pd != '' && pd != undefined ? pd.split('подъезд №:')[1].split(' ')[1] : ''

  return {
    kv: kv,
    etzh: etzh,
    df: df,
    pd: pd
  }
}

export default {
  addresProperties
}