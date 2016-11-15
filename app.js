var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
var router = express.Router();
var path = __dirname + '/views/';

// prepare server
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/angular'));
var server = require("http").createServer(app);
server.listen(3000, function() {
	console.log('Listening at Port 3000');
});

console.log(__dirname);

app.use('/cssFiles', express.static(__dirname + '/assets'));

// cau hinh ejs
app.set("view engine", "ejs"); // template engine
app.set("views", "./views");

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.use("/", router);

app.get("/index", function(req, res) {
	res.render("index");
});

app.get("/about", function(req, res) {
	res.render("about");
});

app.get("/contact", function(req, res) {
	res.render("contact");
});

app.use("*",function(req,res){
  res.render("404");
});

app.post("/login", urlEncodedParser, function(req, res) {
	var userName = req.body.userName;
	var pass = req.body.password;
	res.send("User name: " + userName + "\nPassword: " + pass);

});
