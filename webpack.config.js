var webpack = require("webpack");
var path = require("path");

module.exports = {
	"context": __dirname,
	entry: {
		"Pique": "app/Pique",
	},
	output: {
		filename: "./build/[name].js",
		chunkFilename: "./build/[id].js",
		sourceMapFilename : "[file].map",
	},
	resolve: {
		root: __dirname,
		modulesDirectories : ["bower_components", "app", "style", "node_modules"],
	},
	node: {
		fs: 'empty'
	},
	plugins: [
		new webpack.ResolverPlugin([
			new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])], ["normal", "loader"])
	   ],
	 module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: "style!css!autoprefixer!sass"
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			},
			{
				test: /\.png$/,
				loader: "url-loader",
			},
			{
				test: /\.js$/,
				loader: "transform/cacheable?brfs"
			}
		]
	},
	devtool: "#eval"
};