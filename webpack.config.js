const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';
    
    return {
        entry: {
            main: path.resolve(__dirname, './src/index.js'),
        },

        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js', 
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './public/index.html'),
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin()
        ],
        
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: 'defaults' }],
                                ['@babel/preset-react', { runtime: 'automatic' }]
                            ]
                        }
                    }
                },
                // css
                {
                    test: /\.(css|scss)$/i,
                    // use: ["style-loader", "css-loader", "sass-loader"],
                    use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],	
                },
                // image
		        {
			        test: /\.(png|jpe?g|svg)$/i,
			        type: 'asset/resource'
		        }
            ]
        },

        devServer: {
            hot: true,   // hot reloading
            port: 3000,  // port on which server will run
            open: true   // open browser automatically on start
        }
    
    }
}


