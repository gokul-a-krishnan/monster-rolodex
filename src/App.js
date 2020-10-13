import React, {Component} from 'react';
import './App.css';
import {CardList} from './components/card-list/card-list.component'
import {SearchBox} from './components/search-box/search-box.component'

class App extends Component{

  constructor(){
    super ();
    this.state = {
      monsters: [],
      searchField:''
    }
  }

  handleChange = e => {
    this.setState({searchField: e.target.value});
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response)=>{
        return (response.json());
      })
      .then((users)=>{
        this.setState({
          monsters: users
        })
      })
      .catch((error)=>{
        console.log(error.message);
      })
  }

  render(){
    const { monsters, searchField } = this.state;
    const filteredMonster = monsters
      .filter(monster => monster.name
          .toLowerCase()
          .includes(searchField.toLowerCase())
      );
    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <SearchBox 
          placeholder='Search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonster}/>
      </div>
    );
  }

}

export default App;
