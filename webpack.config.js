const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');


const getEntries = require('./lib/webpack')();


var baseConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/apps/main/index.js',
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist')
  },
  
  //  https://webpack.js.org/configuration/devtool/#production
  devtool: (process.env.NODE_ENV === 'production' ? "source-map" : false),
  
  plugins: [
    //
    //  Purge the build/public folder
    //
    new CleanWebpackPlugin(['dist/*', 'public/*'], {
      root: path.resolve(__dirname),
      verbose: true, 
      dry: false,
      exclude: ['.gitignore', '.DS_Store']
    })
  ],
    
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};



module.exports = (async function () {
  const rootBasePath = './src/apps';
  const distBasePath = './apps';

  var entries = await getEntries(rootBasePath, distBasePath);
  
  console.log('entries', entries);
  
  var config = Object.assign({}, baseConfig);
  
  config.entry = entries;
  
  console.log('baseConfig', baseConfig);
  console.log('config', config);
  
  return config;
})();
