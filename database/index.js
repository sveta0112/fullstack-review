const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // id: Number,
  // name: String,
  // owner: String,
  // description: String,
  // avatar_url: String,
  clone_url: {type:String, unique: true} ///repo addresing 

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  var k  = new Repo({clone_url: repo});
  k.save((err, k) => {
    if(err){
      throw err;
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
  });
}

module.exports.save = save;
module.exports.find = find;