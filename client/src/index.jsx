import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }
  
  getRepos(){
    //console.log(`${term} was found`, JSON.stringify({term}));
    $.ajax({
      method:'GET',
      url:'/repos'
      //context: JSON.stringify(document.body),
      //data: {term}//--> object distraction()or({term:term}) //will go in as a data object
    })
    .done((result) => {
      this.setState({repos: result});
      //console.log( 'Data get: ', result);
    });
  }
  search (term) {
    console.log(`${term} was searched`, JSON.stringify({term}));
    // TODO
    $.ajax({
      method:'POST',
      url:'/repos',
      //context: JSON.stringify(document.body),
      data: {term}//--> object distraction()or({term:term}) //will go in as a data object
    })
    .done(function(result) {

      console.log( 'Data Saved: ', result);
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <button onClick={this.getRepos.bind(this)}>Get repos</button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));