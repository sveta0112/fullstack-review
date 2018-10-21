import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <br/>&nbsp;&nbsp;&nbsp;{props.repos.map((item,index) => (<a key={index} href={item.html_url}><br/>{item.name}<br/>{item.html_url}<br/>&nbsp;&nbsp;&nbsp;&nbsp;<br/>{item.size}</a>
   )
    )}
  </div>
)

export default RepoList;