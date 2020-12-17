module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: process.env.PROXY
  },
}