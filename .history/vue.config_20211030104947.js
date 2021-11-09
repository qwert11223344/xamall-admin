
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "assets": '@/assets',
        "common": '@/common',
        "components": '@/components',
        "views": '@/views',
        "network": '@/network',
        "api": '@/api',
        "utils": '@/utils',
        "store": '@/store'
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/xamall-admin/'
    : '/',
  // devServer: {
  //   port: 8080,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8080"
  //     }
  //   }
  // },
}
