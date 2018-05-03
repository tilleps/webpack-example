/*
https://github.com/webpack/webpack/issues/1189

let entry = {
 'admin/global.js': 'path-to-admin-global.js',
 'front/global.js': 'path-to-front-global.js'
}
{
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}
*/

const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);


module.exports = function () {
  return getEntries;
};

/*
var rootBasePath = './src/apps';
var distBasePath = './apps';

(async function () {
  try {
    var entries = await getEntries(rootBasePath, distBasePath);
    console.log('entries', entries);
    
  }
  catch (err) {
    console.log(err);
  }
  
})();
//*/

async function getEntries(rootBasePath, distBasePath) {
  //
  //   Apps
  //
  try {
    var files = await readdir(rootBasePath);
    //console.log('files', files);
  }
  catch (err) {
    throw err;
  }


  var directories = files.filter(function (file) {
    //console.log('file', file);
    var fd = path.join('./src/apps', file);
  
    var stat = fs.statSync(fd);
    //console.log('result', stat);
  
    return stat.isDirectory();
  });


  //console.log('directories', directories);

  var entries = directories.reduce(function (prev, dir) {
  
    var distPath = ['.', path.normalize(distBasePath), dir, 'index.js'].join(path.sep);  //path.join(distBasePath, dir, 'index.js');
    var entryName = ['.', path.normalize(rootBasePath), dir, 'index.js'].join(path.sep); //path.join(rootBasePath, dir, 'index.js');
    
    prev[distPath] = entryName;
  
    return prev;
  }, {});

  //console.log('entries', entries);
  
  return entries;
}


/*
//
//   Apps
//
var files = fs.readdirSync(rootBasePath);
console.log('files', files);

var directories = files.filter(function (file) {
  console.log('file', file);
  var fd = path.join('./src/apps', file);
  
  var stat = fs.statSync(fd);
  console.log('result', stat);
  
  return stat.isDirectory();
});


console.log('directories', directories);

var entries = directories.reduce(function (prev, dir) {
  
  var distPath = path.join(distBasePath, dir, 'index.js');
  var entryName = path.join(rootBasePath, dir, 'index.js');
  
  prev[distPath] = entryName;
  
  return prev;
}, {});

console.log('entries', entries);
*/