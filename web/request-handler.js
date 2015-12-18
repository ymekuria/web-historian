var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
var _ = require('underscore');

exports.handleRequest = function (req, res) {

  if( req.method === 'GET') {

    if ( req.url === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets, '/index.html',function(err, data) {
        if (err) {
          throw err;
        } else {
          res.writeHead(200,httpHelpers.headers);
          res.end(data);
        }
      }); 
    }  else {

    fs.readdir(archive.paths.archivedSites, function(error, files){ 
      if(error) {
        console.log(error);
        throw error;
      } else {
        var slicedUrl = req.url.slice(1);        
        // check if the request url is in our archived sites
        if( _.contains(files, slicedUrl )) {
          console.log('we have the file!');
          var assets = req.url;

          httpHelpers.serveAssets(res, archive.paths.archivedSites, '/' + slicedUrl, function(error, data) {
             console.log('we are serving assets');
            if (error) {
              console.log('error?');
              throw error;
            } else {
              console.log('we are serving!!');
              res.writeHead(200,httpHelpers.headers);
              res.end(data);
            }
          });
       

        } else {
          console.log('inside nonexistent url:', req.url);
          res.writeHead(404,httpHelpers.headers);
          res.end();
        }

      }

    }); //readdir
  }//big else
} //big Get
 else if ( req.method === "POST") {
 
    var dataStr= "";
    var url;
    var statusCode = 201; 
    req.on('error', function(err){
      throw err;
    });

    req.on("data", function(chunk){

    dataStr += chunk.toString();
     
    }); 
    req.on('end', function(data){
      //data = JSON.parse(data);
      // var statusCode = 302;
      
      url =dataStr.substr(4) + "\n";
      
      fs.appendFile(archive.paths.list, url, function(error){
        if (error){
          throw error;
        }
      });
      res.writeHead(302, httpHelpers.headers);
      httpHelpers.serveAssets(res, archive.paths.list, '' ,function(error, data){
        console.log('inside serverASSETS:', archive.paths.list);
        if (error) {
          throw error;
        }
        res.end();
      });
 
      
    });
    

 }
 
}; //handle request

