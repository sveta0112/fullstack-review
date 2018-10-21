const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (user, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  //console.log(`https://api.github.com/users/${user.term}/repos`);
  let options = {
    url: `https://api.github.com/users/${user.term}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request.get(options , (err, gitBody) => {
    if(err){
      throw err;  
    }else{
      //console.log(JSON.parse(gitBody.body.name));
      for(var i = 0; i < JSON.parse(gitBody.body).length; i++){
        db.save(JSON.parse(gitBody.body)[i].name, JSON.parse(gitBody.body)[i].html_url, JSON.parse(gitBody.body)[i].size);
      }
      // db.save(JSON.parse(gitBody.body));
      callback(null, JSON.parse(gitBody.body));
    }
  });


}

module.exports.getReposByUsername = getReposByUsername;