var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('uploadfile'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/upload/*', function (req, res) {
      res.sendFile(__dirname + req.path);
})

app.get('/script/*.js', function (req, res) {
      res.sendFile(__dirname + req.path);
})

app.post('/upload', function (req, res) {
      console.log(req.files[0]);
      var hostname = "http://" + req.hostname + ":" + server.address().port;
      var filepath = "/upload/" + req.body.username;
      var filepathname = filepath + "/"  +  req.body.upfilename;
      var des_dir = __dirname + filepath;
      var des_file = __dirname + filepathname;

      if(!fs.existsSync(__dirname + "/upload")){
            fs.mkdirSync(__dirname + "/upload");
      }
      if (!fs.existsSync(des_dir)) {
            fs.mkdirSync(des_dir);
      }

      fs.readFile( req.files[0].path, function (err, data) {
            fs.writeFile(des_file, data, function (err) {
                  if( err ){
                        console.log(err);
                        response = {
                              status: false,
                              message: err
                        };
                  }else{
                        response = {
                              status: true,
                              downloadUrl: hostname + filepathname
                        };
                  }
                  console.log( response );
                  res.end( JSON.stringify( response ) );
            });
      });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Application deployed, address:  http://%s:%s", host, port)

})
