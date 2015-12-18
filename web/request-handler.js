var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
var _ = require('underscore');

exports.handleRequest = function (req, res) {
 // var isURL = archive.isUrlArchived(req.url.slice(1), function(err, data) {
 //    if (err) {
 //      throw err;
 //    } else {
 //      console.log(data);
 //      res.end(data);
 //    }
 //  });
 
 
  

  if( req.method === 'GET') {

    if ( req.url === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets, 'index.html',function(err, data) {
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

          httpHelpers.serveAssets(res, archive.paths.archivedSites, slicedUrl, function(error, data) {
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
}; //handle request

  




    // if ( !isURL ) {
  

    // } else if ( isURL ) {
    //   //magic happens
    //   console.log('url exists, before paths', req.url);
    //   var path = archive.archivedSites + '/' + req.url;
    //   console.log('path:', path);
    //   console.log('inside of isURL-true');
    //   res.writeHead(200, httpHelpers.headers);
    //   //get into sites/google folder
      
     
      
    //   fs.readFile(path, function(error,data){
    //     if (error) {
    //       throw error;
    //     } else {
    //       res.end(data);
    //     }
    //   });

        //read contents of the google file in here
          //return contents



// !httpHelpers.isUrlInList(req.url, function() {
//       console.log(true); })
// var getOptions = function(getRequest, res, asset) {
//   httpHelpers[getRequest](res, asset, function(data) {
//     res.end(data);
//   });
// };