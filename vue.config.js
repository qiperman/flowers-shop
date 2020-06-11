module.exports = {
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development'
      ? 'inline-source-map'
      : false
  },
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV === 'development'
      },
      sass: {
        sourceMap: true,
        prependData: `
          @import "@/assets/scss/common.scss";
        `
      }
    }
  }
}
