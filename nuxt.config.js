export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  generate: { fallback: true },
  generate: { fallback: '404.html' },
  target: 'static',
  head: {
    title: 'Интернет-магазин мяса и птицы',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Интернет-магазин мяса и птицы' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
    'material-design-icons-iconfont/dist/material-design-icons.css'
  ],

  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
    'bootstrap-vue/nuxt',
    'nuxt-material-design-icons',
    'nuxt-material-design-icons-iconfont',
    'nuxtjs-mdi-font',
    ['bootstrap-vue/nuxt', { css: false }]
  ],

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/services/serviceContainer.js',
    '~/plugins/persistedStateIndexDB.client.js',
    '~/plugins/persistedState.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  styleResources: {
    scss: ['@/assets/scss/main.scss']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
