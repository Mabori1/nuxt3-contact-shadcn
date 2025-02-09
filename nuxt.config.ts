// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@prisma/nuxt",
    "nuxt-auth-utils",
  ],
  colorMode: { classSuffix: "" },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  prisma: {
    autoSetupPrisma: true,
  },
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },
  nitro: {
    externals: {
      traceInclude: ["node_modules/nopt/lib/nopt.js"],
    },
  },
});

