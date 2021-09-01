const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.ts', '.js', '.json'],
		alias: {
			handlebars: 'handlebars/dist/handlebars.min.js',
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: path.resolve(__dirname, 'tsconfig.json'),
						},
					},
				],
				exclude: /(node_modules)/,
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
	devServer: {
		hot: true,
		historyApiFallback: true,
		static: path.join(__dirname, 'dist'),
		compress: true,
		port: 4000,
		open: true,
	},
};
