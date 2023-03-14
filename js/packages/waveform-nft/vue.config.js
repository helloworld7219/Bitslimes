const { getThemeVariables } = require('ant-design-vue/dist/theme')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            ...getThemeVariables({ dark: true }),
            'primary-color': '#9242F3',
            'link-color': '#9242F3',
            'border-radius-base': '10px'
          },
          javascriptEnabled: true
        }
      }
    }
  }
}
