const express = require('express');
const bodyParser = require('body-parser');
var helpers = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos',(req, res) => {
	console.log(req.body);
	helpers.getReposByUsername(req.body, (err, result) =>{
		if(err){
		  throw err;
		}else{
		  //console.log('hi',result[0].clone_url);	
		  res.send(result);
		}
	});
      
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.find((err, result) => {
    if(err){
    	throw err;
    }else{
    	var final = result.map(val =>  val.clone_url);
    	console.log(final);
    	res.send(final);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

