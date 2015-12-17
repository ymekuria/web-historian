var fs = require('fs');
var path = require('path');
var _ = require('underscore');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(error, data) {
    if (error) {
      throw error;
    } else {
      callback(data.split("\n"));
       //console.log('data', JSON.stringify(data.split("\n")));
    }
  });
};

exports.isUrlInList = function(urlToFind, callback) {
  callback (_.contains(exports.paths.list.split("\n"), urlToFind));
};

exports.addUrlToList = function(urlToAdd, callback) {
  var extended = exports.paths.list.concat(urlToAdd);
  callback(fs.writeFile(extended));
};

exports.isUrlArchived = function(fileToFind, callback) {
  var found = false;
  fs.readdir(exports.paths.archivedSites, function(error, files){
    if (error) {
      throw error;
    } else {
      _.each(files, function(file) {
      if( fileToFind === file ) {
        found = true;
      }

      });
    }
  });
  callback(found);
  
};

exports.downloadUrls = function(urlsToDownload) {

_.each(urlsToDownload, function(url){

  fs.writeFile(exports.paths.archivedSites+'/'+url, url, function (error) {
    if (error) {
      throw error;
    }

  });
}) ;  

};

