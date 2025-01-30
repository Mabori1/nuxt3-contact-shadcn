// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@prisma/nuxt",
  ],
  colorMode: { classSuffix: "" },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  prisma: {
    autoSetupPrisma: true,
  },
});
