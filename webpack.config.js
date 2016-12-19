var path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: './app/entry.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'stage-0', 'react'],
					plugins: [
						['transform-decorators-legacy']
					]
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}
		],
	}
};