const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');


//Multi page entry
function getEntry() {
    const entry = {};
    glob.sync('./src/examples/**/index.js').forEach((file) => {
        const name = file.match(/\/examples\/(.+)\/index.js/)[1];
        entry[name] = file;
    });
    return entry;
}

//Multi page template
function getHtmlTemplate() {
    return glob
      .sync('./src/examples/**/index.js')
      .map((file) => {
        return { name: file.match(/\/examples\/(.+)\/index.js/)[1], path: file };
      })
      .map(
        (template) =>
          new HtmlWebpackPlugin({
            chunks: [template.name.toString()],
            filename: `examples/${template.name}.html`,
          })
      );
  }

module.exports = {
    mode: 'development',
    entry: getEntry(),
    plugins: [
        ...getHtmlTemplate()
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    output: {
        filename: 'examples/js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(glb|gltf)$/,
                use:
                    [
                        {
                            loader: 'file-loader',
                            options:
                            {
                                outputPath: 'assets/models/'
                            }
                        }
                    ]
            },
        ],
    },
};