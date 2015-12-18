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
 else if ( req.method === "POST") {
  console.log('posting');
  //type = form
  //send = { url: url }
  //readFile ??
    var data = "";
    var statusCode = 201; 
    req.on('error', function(err){
      console.error(err);
    }).on("data", function(chunk){
      data += chunk.toString();
      console.log('on data fn:', data);
      achive.addUrlToList(trimmedUrl, function(err, data) {
        if (err) {
          throw err;
        } else {
          console.log('Url added to the sites folder');
        }
      });
      //do something with the data
        //use writfile
    }).on('end', function(){
      data = JSON.parse(data);
      console.log('DATA after JSONparse:', data);
      res.writeHead(statusCode, httpHelpers.headers);
      res.write(JSON.stringify({ "data": data}));
      res.end();
    });
    

 } 
 /*
 it("should append submitted sites to 'sites.txt'", function(done) {
        var url = "www.example.com";

        // Reset the test file and process request
        fs.closeSync(fs.openSync(archive.paths.list, "w"));

        request
          .post("/")
          .type('form')
          .send({ url: url })
          .expect(302, function (err) {
            if (!err) {
              var fileContents = fs.readFileSync(archive.paths.list, 'utf8');
              expect(fileContents).to.equal(url + "\n");
            }
*/
}; //handle request

  

//ISURLARCHIVED FAIL:
// else {
//       if (!isURL) {
//         console.log('not matching');
//         res.writeHead(404,httpHelpers.headers);
//         res.end();
//       } else {
//         httpHelpers.serveAssets(res, archive.paths.archivedSites, slicedUrl, function(error, data) {
//             if (error) {
//               throw error;
//             } else {
//               res.writeHead(200,httpHelpers.headers);
//               res.end(data);
//             }
//           });
//       }

// };