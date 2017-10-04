const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const polyfills = [
  'classlist.js'
];

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: [].concat(polyfills, ['./assets/js/app.js']),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'assets/js/bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000 } // Convert images < 10k to base64 strings
        }]
      }
    ]
  },

  devServer: {
    contentBase: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'build')
    ],
    inline: true,
    compress: true,
    open: true
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'index.html'
      }
    ])
  ]
};