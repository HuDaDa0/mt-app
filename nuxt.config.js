export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'mt-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    retry: { retries: 3 },
    // 开发模式下开启debug
    debug: process.env._ENV !== 'production',
    // 设置不同环境的请求地址
    baseURL:
      process.env._ENV === 'production'
        ? 'http://localhost:3000/api'
        : 'http://localhost:3000/api',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json', crossDomain: true },
    timeout: 5000
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:3001/',
      pathRewrite: {
        '^/api/': ''
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/]
  }
}
