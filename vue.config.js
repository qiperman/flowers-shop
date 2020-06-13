module.exports = {
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development'
      ? 'inline-source-map'
      : false
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('svg-inline-loader')
      .loader('svg-inline-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },
  css:
    {
      loaderOptions: {
        css: {
          sourceMap: process.env.NODE_ENV === 'development'
        },
        sass: {
          sourceMap: true,
          prependData:
            `
          @import "@/assets/scss/common/index.scss";
        `
        }
      }
    }
}
