const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  html_url: {type:String, unique: true},
  size: Number ///repo addresing 

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (name,repo, size) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  var info  = new Repo({name: name, html_url: repo, size: size});
  info.save((err, info) => {
    if(err){
      console.log("Can not add duplicates to database!");
    }
  });
}

let find = (cb) => {
  Repo.find({}, (err, results) => {
    if(err){
      cb(err, null);
    }else{
      cb(null, results);
    }
  }).limit(25).sort('size');
}

module.exports.save = save;
module.exports.find = find;