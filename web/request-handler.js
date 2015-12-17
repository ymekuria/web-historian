var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

exports.handleRequest = function (req, res) {
  var isURL = archive.isUrlArchived(req.url, function() {console.log(true); });
 console.log('isUrlInList:');
 console.log('req:',req.url);
  

  if( req.method === 'GET') {
    

    if ( req.url === '/') {
      httpHelpers.serveAssets(res,'index.html',function(data) {
        res.writeHead(200,httpHelpers.headers);
        res.end(data);
      }); 
    } else if ( !isURL ) {
      res.writeHead(404,httpHelpers.headers);
      res.end();

    } else if ( isURL ) {
      //magic happens
      res.writeHead(200, httpHelpers.headers);
      //get into sites/google folder
      fs.readFile('path--file in', function(error,data){
        if (error) {
          throw error;
        } else {
          res.end(data);
        }
      })

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