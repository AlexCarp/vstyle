var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, './'),
	entry: {
		app: './styles/index.scss'
	},
	output: {
		path: path.join(__dirname, './build'),
		filename: '[name].bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					filename: "[name].css",
					allChunks: true,
					fallback: "style-loader",
					use: [
						"css-loader",
						"postcss-loader",
						"sass-loader"
					],
				})
			},
			{
				test: /\.woff$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
			}, {
				test: /\.woff2$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
			}, {
				test: /\.(eot|ttf|svg|gif|png|jpg|jpeg)$/,
				loader: "file-loader"
			}, {
				test: /\.pug$/,
				loaders: [
					'pug-loader'
				]
			}

		]
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'index.pug')
		})
	],
	devServer: {
		port: 8081,
		compress: true,
		historyApiFallback: true,
		host: "0.0.0.0"
	}
};
