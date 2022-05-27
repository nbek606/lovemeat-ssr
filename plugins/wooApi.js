
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
import store from '../store/user'

export const wooApi = (uri, method, data = {}) => {
    let wooApi = new WooCommerceRestApi({
        url: "https://back.lovemeat.ru",
        consumerKey: "ck_924a8f82c3ebe91af2023b430a9204d2691b3330",
        consumerSecret: "cs_ba22345cfa5c295189cfebb57e467673153ddb16",
        wpAPI: true,
        version: "wc/v3",
        queryStringAuth: true,
        axiosConfig: {
          headers: {
            'Authorization': `Bearer ${store.state.token}`,
            'Content-Type': 'application/json',
          }
        }
    });
  
    if (method == 'get') {
      return wooApi.get(uri)
    } else {
      return wooApi[method](uri, data)
    }
}
