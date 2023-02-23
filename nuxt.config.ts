// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/xenom97.github.io/',
  },

  ssr: false,

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  typescript: {
    typeCheck: true,
  },

  runtimeConfig: {
    public: {
      openWeatherMapKey: '',
    },
  },
});
