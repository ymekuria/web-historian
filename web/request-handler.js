var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

exports.handleRequest = function (req, res) {
  if( req.method === 'GET') {
    res.writeHead(200,httpHelpers.headers);

    httpHelpers.serveAssets(res,'index.html',function(data) {
      res.end(data);
    });
  }  
  


};
