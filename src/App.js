import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      pictures:[]
    }
    //Getting images from flickr api
    var self = this;
    this.handleClick = function(){
      fetch(  'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f86d456db87838e53eea443b31630f4b&tags='+document.getElementsByClassName("searchInput")[0].value +'&per_page=5&page=1&format=json&nojsoncallback=1'
      )
      .then(function(response){
        return response.json();
      })
      .then(function(j){
        let picArray = j.photos.photo.map((pic)=>{
          var picPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
          return(
            <img alt="flick_img" src={picPath} className="image"/>
          )
        })
        self.setState({pictures:picArray})
      })
    }
  }
    
  render() {
    return (
      <div className="App">

          <div className="searchBar">
            <input type="search" placeholder="Enter the keyword" className="searchInput"/>
            <input type="submit" className="searchButton" value="Search" onClick={this.handleClick}/>
          </div><br/>

          <div className="images">
              {this.state.pictures}
          </div>

          <div className="groupChoose">
            
          </div>

          <div className="groupPics">

          </div>
      </div>
    );
  }
}


export default App;