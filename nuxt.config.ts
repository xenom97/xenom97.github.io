// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
});
