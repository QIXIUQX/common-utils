const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,

	//部署应用包时的基本 URL
	publicPath: process.env.NODE_ENV === "production" ? "././" : "/",
	configureWebpack: {
		resolve: {
			alias: {
				assets: "@/assets",
				components: "@/components",
				network: "@/network",
				views: "@/views",
			},
		},
		devServer: {
			host: "0.0.0.0",
			port: 8888,
			open: true,
			https: false,
			proxy: {
				"/devApiServer": {
					target: "http://localhost:3000",
					changeOrigin: true,
					ws: true,
					pathRewrite: {
						"^/devApiServer": "",
					},
				},
			},
		},
	},
	css: {
		loaderOptions: {
			sass: {
				//additionalData: `@import "@/assets/scss/_var.scss";`, 最新版需要改为这个
				additionalData: `
				          @import "@/assets/scss/_var.scss";
				          @import "@/assets/scss/mixin.scss";
				          `,
			},
		},
	},
})


