import React, { Component } from "react";
import axios from 'axios';
import Search from "./Components/Search";
import Results from "./Components/Results";
import Nominantes from "./Components/Nominantes";


class App extends Component {
  state = {
    basicUrl: "https://www.omdbapi.com/?apikey=",  // http://www.omdbapi.com/?apikey=1ca36356&type=movie&s=terminator
    apikey: "1ca36356",
    searchParameter: {
      movie: "&type=movie",
      titleForSearch: "&s="
    },

    movies: [],

    nominantList: [],
    isNominantAble: true, 

    errorMessage: "",
    messageStyle: "",
  }

  onChangeHandler = (e) => {
    this.setState({ movieName: e.target.value });
  }

  submitHandler = (e) => {

    e.preventDefault();
    
    const searchUrl = this.state.basicUrl + 
                      this.state.apikey + 
                      this.state.searchParameter.movie + 
                      this.state.searchParameter.titleForSearch + 
                      this.state.movieName;

    if (this.state.movieName) {
    axios.get(searchUrl)
        .then( res =>{
          if (res.data.Search){
            const result = res.data.Search
            this.setState({movies: result})
            this.setState({errorMessage: ""})
          }else {
          this.setState({errorMessage: " Movie not found! "})
          this.setState({messageStyle: "#181836"})
          
        }})
      }else{
      this.setState({errorMessage: "Please, enter the movie name " })
      this.setState({messageStyle: "#181836"})
    }
  }

  clickNominantHandler = async (movie) => {
    if(this.state.nominantList.length <= 4 ){
      await this.setState({nominantList: [...this.state.nominantList, movie ]})
    }
    if(this.state.nominantList.length === 5){
      this.setState({errorMessage: "You have 5 nominations!"})
      this.setState({messageStyle: "#37973b"})
    }
  }
  
  removeNominantHandler = (id) => {
    this.setState({nominantList: [...this.state.nominantList.filter (e => e.imdbID !== id)]})
    this.setState({errorMessage: ""})
  }

  render(){
    return (
      <div className="app">
        <header className="app-header">
          <h1>The Shoppies:</h1>
        </header>
        <main>
          
          <Search submitHandler = {this.submitHandler}  onChangeHandler = {this.onChangeHandler} errorMessage = {this.state.errorMessage} messageStyle= {this.state.messageStyle}/>
          <section className = "app-movies-container">
            <Results movieList = {this.state.movies} clickNominantHandler = {this.clickNominantHandler} nominantList = {this.state.nominantList} />
            <Nominantes nominantList = {this.state.nominantList}  removeNominantHandler = {this.removeNominantHandler } />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
