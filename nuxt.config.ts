// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  runtimeConfig: {
    yookassaKey: process.env.YOOKASSA_KEY,
  }
})
