export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://backend:5000'
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', "@nuxtjs/google-fonts"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  googleFonts: {
    families: {
      "Pacifico": [400],
      "Berkshire Swash": [400],
      Kurale: [400],
      Inter: [400, 700],
      'Josefin+Sans': true,
      Lato: [100, 300],
      Roboto: true,
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
      'Crimson Pro': {
        wght: '200..900',
        ital: '200..700',
      }
    }
  }
})
