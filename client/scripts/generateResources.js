var fs = require('fs');
var path = require('path');

var staticResourceDir = '/resources/';
var ignoreFiles = ['.DS_Store', 'license.txt', 'LICENSE.txt', 'index.html', 'melonjs_6.3.0.js', 'debugpanel_6.3.0.js'];
var ignoreExtensions = [];
var resourcesPath = './resources/';
var resourcesFile = './src/game/resources.js';

var melontypes = {
  image: ['png', 'jpg', 'jpeg', 'PNG'],
  binary: ['fnt', 'ltr', 'ttf'],
  tmx: ['tmx'],
  tsx: ['tsx'],
  audio: ['mp3', 'ogg']
};

/*
  Why MelonJS?
    why format audio differently?
*/
var handleAudio = function(file, dir) {
  file['type'] = 'audio';
  file['src'] = staticResourceDir + dir.replace(resourcesPath, '');
  var name = file['name'].split('/').pop();
  file['name'] = name;
  return file;
};

var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
  files = fs.readdirSync(dir);
  filelist = filelist || {};
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    } else {
      if (ignoreFiles.indexOf(file) < 0 && ignoreExtensions.indexOf(path.extname(file)) < 0) {
        var fileName = file;
        var src = dir.replace(resourcesPath, '') + file;
        var file = {};
        var fragments = fileName.split('.');

        var key = src.split('/')[0];

        file['name'] = fragments[0]
        if (key == 'items') {
          file['name'] = 'item_' + fragments[0];
        }

        file['src'] = staticResourceDir + src;

        if (!(key in filelist)) {
          filelist[key] = [];
        }

        Object.keys(melontypes).some(function(type) {
          if (melontypes[type].indexOf(fragments[1]) >= 0 && type != 'audio') {
            file['type'] = type;
            return true;
          }
          if (melontypes[type].indexOf(fragments[1]) >= 0 && type === 'audio') {
            file = handleAudio(file, dir);
            return true;
          }
          return false;
        });

        if (!('type' in file)) {
          console.log(file);
        }
        filelist[key].push(file);
      }
    }
  });
  return filelist;
};

var data = walkSync(resourcesPath);
var file = fs.createWriteStream(resourcesFile);
//console.log("Exporting resources to: " + resourcesFile);
//console.log(data);
file.write('export default ' + JSON.stringify(data, null, '  ') + ";\n");
file.end();