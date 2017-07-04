var webpack = require('webpack');
var ExtractTextPlugin = require('./my_modules/extract-text-webpack-plugin');
var ReactToHtmlPlugin = require('react-to-html-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var multi = require('multi-loader');

var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

var ExtractCSS = new ExtractTextPlugin({ filename: 'react_style.css', allChunks: true });
var ExtractVueCSS = new ExtractTextPlugin({ filename: 'vue_style.css', allChunks: true });
// var ExtractCSSLocals = new ExtractTextPlugin({ filename: 'style_locals.css', allChunks: true });

var cssLoaderQuery = "modules&importLoaders=0&localIdentName=[name]_[local]_[hash:base64:8]";
var cssLoaderAfterLessQuery = "modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:8]";

var cssLoaderStr = 'yan-css-loader';

module.exports = {
  entry: {
    // react: path.join(__dirname, 'src/react_index.js'),
    vue: path.join(__dirname, 'src/vue_index.js')
  },

  output: {
    filename: "[name]_bundle.js",
    path: path.resolve('./dist'),
    libraryTarget: 'umd',
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [
          /node_modules/,
          /my_modules/
        ]
      },
      {
        test: /\.css$/,
        loader:
          // `vue-style-loader!${cssLoaderStr}?${cssLoaderQuery}`,
          ExtractCSS.extract({
            fallback: 'style-loader',
            use: `${cssLoaderStr}?${cssLoaderQuery}`
          }),
        exclude: /style_locals\.css$/
      },
      {
        test: /\.less$/,
        loader:
          // `vue-style-loader!${cssLoaderStr}?${cssLoaderQuery}`,
            ExtractCSS.extract({
              fallback: 'style-loader',
              use: `${cssLoaderStr}?${cssLoaderAfterLessQuery}!less-loader`
            })
      },
      {
        test: /\.vue$/,
        issuer: [
          /AgentRoot\.less/,
          /cssLocals\.less/,
          /cssLocals\.js/
        ],
        use: [
          {
            loader: 'csslocals-from-vue-loader'
            ,
            query: {
              exports: ['$style']   // default is '$style' (String)
            }
          }
          ,
          {
            loader: 'my-vue-loader',
            options: {
              loaders: {
                css: `${cssLoaderStr}?${cssLoaderQuery}`,
                less: `${cssLoaderStr}?${cssLoaderQuery}!less-loader`
              }
            }
          }
        ]
      },
/*
      {
        test: /ScopedRoot\.vue/,
        issuer: {
          exclude: [
            /AgentRoot\.less/,
            /cssLocals\.js/
          ]
        },
        use: [
          {
            loader: 'my-vue-loader',
            options: {
              loaders: {
                css: ExtractVueCSS.extract({
                  fallback: 'style-loader',
                  remove: true,
                  use: `${cssLoaderStr}?${cssLoaderQuery}`
                }),
                less: ExtractVueCSS.extract({
                  fallback: 'style-loader',
                  remove: true,
                  use: `${cssLoaderStr}?${cssLoaderQuery}!less-loader`
                })
              }
            }
          }
        ]
      },
*/
      {
        test: /\.vue$/,
        issuer: {
          exclude: [
            /cssLocals\.js/
          ]
        },
        // exclude: /ScopedRoot\.vue/,
        use: [
/*
          {
            loader: 'inspect-loader?label=no-querry'
          }
          ,
*/
          {
          loader: 'my-vue-loader',
          options: {
            loaders: {
/*
              css: `vue-style-loader!${cssLoaderStr}?${cssLoaderQuery}`,
              less: `vue-style-loader!${cssLoaderStr}?${cssLoaderQuery}!less-loader`
*/
              css: ExtractVueCSS.extract({
                fallback: 'style-loader',
                use: `${cssLoaderStr}?${cssLoaderQuery}`
              }),
              less: ExtractVueCSS.extract({
                fallback: 'style-loader',
                use: `${cssLoaderStr}?${cssLoaderQuery}!less-loader`
              })
            }
/*
            ,
            cssModules: {
              localIdentName: '[name]_[local]_[hash:base64:8]',
              camelCase: true
            }
*/
          }
        }]
      },
      {
        test: /\.js$/,
        issuer: [
          /\.less$/,
          /\.css$/
        ],
        exclude: [
          /node_modules/,
          /my_modules/
        ],
        use:[
          {
            loader: "csslocals-from-js-loader",
            query: {
              exports: ['$style', 'locals']   // default is 'locals' (String)
            }
          },
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.svg$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },

/*
  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ],
*/

  resolve: {
    modules: [
      "my_modules",
      'node_modules',
      'components'
      // path.resolve(__dirname, 'src', 'components')
    ],
    extensions: [".js", ".jsx", ".css", ".less", ".vue"]
  },

  resolveLoader: {
    modules: [
      "my_modules",
      "node_modules",
      path.resolve(__dirname, 'src', 'components')
    ],
    extensions: [".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
    mainFields: ["webpackLoader", "webLoader", "loader", "main"],
    moduleExtensions: ['-loader']
  },

  target: 'web',

  node: {
    console: false,
    global: true,
    process: true,
    __filename: "mock",
    __dirname: "mock",
    Buffer: true,
    setImmediate: true
  },

  plugins: [
    // new ExtractTextPlugin('style.css', { allChunks: true }),
    // ExtractCSSLocals,
    ExtractCSS,
    ExtractVueCSS,
/*
    new HtmlWebpackPlugin({
      filename: 'react_index.html',
      chunks: ['react'],
      template: '!!extract-loader!html-loader!ejs-loader!./src/template.ejs'
    }),
*/
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['vue'],
      template: '!!extract-loader!html-loader!ejs-loader!./src/vue_template.ejs'
    }),
/*
    new ReactToHtmlPlugin('index.html', 'index.js', {
      static: true,
      template: ejs.compile(fs.readFileSync(__dirname + '/src/template.ejs', 'utf-8'))
    }),
    new webpack.ProvidePlugin({
      _: "underscore"
    })
*/
  ]
};
