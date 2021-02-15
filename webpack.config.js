const path = require("path");

module.exports = {
	entry: "./src/main.js",
	output: {
		filename: "polytope.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
};
