var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

exports.handleRequest = function (req, res) {
 console.log('req',req.url);

  if( req.method === 'GET') {
    res.writeHead(200,httpHelpers.headers);

    if ( req.url === '/') {
      httpHelpers.serveAssets(res,'index.html',function(data) {
        res.end(data);
      }); 
    } else {
      httpHelpers.arhivedSites(res, req.url ,function(data) {
        res.end(data);
      });
    }
  }  
  


};

// var getOptions = function(getRequest, res, asset) {
//   httpHelpers[getRequest](res, asset, function(data) {
//     res.end(data);
//   });
// };