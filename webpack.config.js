var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry: {
		"Pique": "./app/Pique",
	},
	output: {
		filename: "./build/[name].js",
		chunkFilename: "./build/[id].js",
		sourceMapFilename : "[file].map",
	},
	resolve: {
		modules : ["app", "style", "node_modules"],
	},
	 module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			},
			{
				test: /\.(png|jpg)$/, 
				loader: "url-loader"
			}
		]
	},
	devtool: "#source-map"
};