module.exports = {
	runtimeCompiler: true,

	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = 'Muse Vue Ant Design - by Creative Tim'
				return args
			})
	},

	devServer: {
		open: process.platform === 'darwin',
		host: '0.0.0.0',
		port: 8083, // CHANGE YOUR PORT HERE!
		https: false,
		hotOnly: false,
	},
}
