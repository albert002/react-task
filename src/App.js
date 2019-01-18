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

  removePic(pic,id){
    console.log(`the picture with id ${id} has been deleted`);
    this.state.pictures.filter((value,index,arr) => {
      if(value.key === id){
        this.state.pictures.splice(index,1)
      }
      this.setState({pictures:this.state.pictures})
    })
  }

    dragStart(ev,term,id){
      ev.dataTransfer.dropEffect = "move";
      ev.dataTransfer.setData("text/plain",[term,id]);
    }

    dragOver(ev){
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move"
    }
    drop(ev,term){
      ev.preventDefault();
      //console.log(ev.dataTransfer.getData("text/plain").split(",")[0])
      let btnTxt = ev.dataTransfer.getData("text/plain").split(",")[0];
      let id = ev.dataTransfer.getData("text/plain").split(",")[1]
        if(term === btnTxt)
          this.state.pictures.forEach((pic) => {
            if(pic.key === id){
              this.removePic(pic,id);
            }
          })
        else
          console.log(false)
    }
    handleSubmit(e){
      let pictures = [];
      let terms = this.searchInput.value.split(" ");
      let doneRequests = 0;

      e.preventDefault();
      terms.forEach((term)=>{
        fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e23dc203e4bb90a1001fbed2e333ce80&tags='+term +'&per_page=5&page=1&format=json&nojsoncallback=1')
        .then((res)=>res.json())
        .then((resp)=>{
          console.log(resp)
          resp.photos.photo.forEach(pic=>{
            let data = {};
            pictures.push(
              <img 
              src={this.makePicPath(pic)}
              alt={term}
              key={pic.id}
              onDragStart={$ev => this.dragStart($ev,term,pic.id)}
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
                <div className="term" key={term} onDragOver={this.dragOver} onDrop={(e) => this.drop(e,term)}>{term}</div>
            )}
          </div>

          <div className="groupPics">

          </div>
      </div>
    );
  }
  
}



export default App;