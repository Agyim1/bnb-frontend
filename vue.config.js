const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  devServer: {
    client: {
      webSocketURL: 'ws://localhost:8080/ws',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5043',
        changeOrigin: true,
      }
    },
  },
  transpileDependencies: true
});
console.log("I am loaded!!")