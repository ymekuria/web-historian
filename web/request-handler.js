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
      }); // if url is in the archive
    } else if ( httpHelpers.isUrlArchived(req.url, function(isArchived) {
      console.log(isArchived); }) ) {
      // do something

      //if not do 404
    } else if ( !httpHelpers.isUrlArchived(req.url, function(isArchived) {
      console.log(isArchived); }) ) {
  }


};

// var getOptions = function(getRequest, res, asset) {
//   httpHelpers[getRequest](res, asset, function(data) {
//     res.end(data);
//   });
// };