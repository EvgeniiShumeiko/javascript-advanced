const path = require('path');

module.exports = {
    mode: 'production',
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "public/assets/scripts"),
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    }
}