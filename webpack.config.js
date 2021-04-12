const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'production',
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "public/assets/scripts"),
        filename: "main.js"
    },
    resolve: {
        alias : {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
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
                    "vue-style-loader",
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: false
                        }
                    },
                    "sass-loader",
                ]
            },
            {
                test: /\.vue$/i,
                use: [
                    'vue-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]

}