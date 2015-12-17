var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

exports.handleRequest = function (req, res) {
  var isURL = archive.isUrlArchived(req.url, function() { return true; });
 
 
  

  if( req.method === 'GET') {
    console.log('inside of GET');
    

    if ( req.url === '/') {
      console.log('inside of /:', req.url);
      httpHelpers.serveAssets(res,'index.html',function(data) {
        res.writeHead(200,httpHelpers.headers);
        res.end(data);
      }); 
    } else if ( !isURL ) {
      console.log('inside nonexistent url:', req.url);
      res.writeHead(404,httpHelpers.headers);
      res.end();

    } else if ( isURL ) {
      //magic happens
      console.log('url exists, before paths', req.url);
      var path = archive.archivedSites + '/' + req.url;
      console.log('path:', path);
      console.log('inside of isURL-true');
      res.writeHead(200, httpHelpers.headers);
      //get into sites/google folder
      
     
      
      fs.readFile(path, function(error,data){
        if (error) {
          throw error;
        } else {
          res.end(data);
        }
      });

        //read contents of the google file in here
          //return contents

    }

  }
};

// !httpHelpers.isUrlInList(req.url, function() {
//       console.log(true); })
// var getOptions = function(getRequest, res, asset) {
//   httpHelpers[getRequest](res, asset, function(data) {
//     res.end(data);
//   });
// };