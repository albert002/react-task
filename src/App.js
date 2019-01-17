import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      pictures:[],
      terms:[]
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchInput = null;
  }

  makePicPath(pic){
    return `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
  }

    dragStart(ev,term){
      ev.dataTransfer.dropEffect = "move";
      ev.dataTransfer.setData("text/plain",term);
    }

    dragOver(ev){
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move"
    }
    drop(ev){
      ev.preventDefault();
      console.log(ev.dataTransfer.getData("text/plain"))
    }
    handleSubmit(e){
      let pictures = [];
      let terms = this.searchInput.value.split(" ");
      let doneRequests = 0;

      e.preventDefault();
      terms.forEach((term)=>{
        fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f86d456db87838e53eea443b31630f4b&tags='+term +'&per_page=5&page=1&format=json&nojsoncallback=1')
        .then((res)=>res.json())
        .then((resp)=>{
          resp.photos.photo.forEach(pic=>{
            let data = {};
            pictures.push(
              <img 
              src={this.makePicPath(pic)}
              alt={term}
              key={pic.id}
              onDragStart={$ev => this.dragStart($ev,term)}
              draggable="true"
            />
            )
          })
          if(++doneRequests === terms.length){
            this.setState({pictures:pictures,terms:terms})
          }
        })
      })

    }
   
  
  render() {
    return (
      <div className="App">

          <form className="searchBar" onSubmit={this.handleSubmit}>
            <input type="search" placeholder="Enter the keyword" className="searchInput" ref={a => this.searchInput = a }/>
            <input type="submit" className="searchButton" value="Search" onClick={this.handleClick}/>
          </form>

          <div className="images">
              {this.state.pictures}
          </div>

          <div className="groupChoose">
            {this.state.terms.map(term =>
                <div className="term" key={term} onDragOver={this.dragOver} onDrop={this.drop}>{term}</div>
            )}
          </div>

          <div className="groupPics">

          </div>
      </div>
    );
  }
  
}



export default App;