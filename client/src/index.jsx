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
  this.getRepos = this.getRepos.bind(this);
  }
  componentDidMount(){
     this.getRepos();
  }
  getRepos(){
    $.ajax({
      method:'GET',
      url:'/repos',
      success: (result) => {
        this.setState({repos: result});
      }
    })
    
  }
  search (term) {
    console.log(`${term} was searched`, JSON.stringify({term}));
    // TODO
    $.ajax({
      method:'POST',
      url:'/repos',
      data: {term},
      success: (result) => {
        console.log( 'Data Saved: ', result);
        this.getRepos();
      }
    })
  }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} onSuccess={this.getRepos}/>
        <Search onSearch={this.search.bind(this)}/>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));