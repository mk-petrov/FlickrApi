import React, { Component } from 'react'
import Photo from './components/Photo'
import Form from './components/Form'
import './App.css'

class App extends Component {
  state = {
    photos: []
  }

  API_KEY = 'fabf79364870c33807753253935e0a0e'

  componentWillMount () {
    this.getPhotos()    
  }

  searchPhoto = (e) => {
    e.preventDefault()
    const search = e.target.elements.searchPhoto.value || 'nature'
    this.getPhotos(search)
  }  

  getPhotoInfo = () => {
    let fullPhotoInfo = []
    this.state.photos.map(async (photo) => {
      const api_call = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${this.API_KEY}&photo_id=${photo.id}&secret=${photo.secret}&format=json&nojsoncallback=1`)
      let data = await api_call.json()

      photo.description = data.photo.description._content
      photo.tags = data.photo.tags.tag
      photo.owner = data.photo.owner.username
      fullPhotoInfo.push(photo)

    })

    setTimeout(() => {
      this.setState({photos: fullPhotoInfo})
    }, 1000)
  }
  
  getPhotos = async (search = 'nature') => {
    const api_call = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.API_KEY}&text=${search}&per_page=12&page=1&format=json&nojsoncallback=1`)
    let data = await api_call.json()
    
    let photoArray = data.photos.photo.map((photo) => {      
      return {
        id: photo.id,
        secret: photo.secret,
        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`,
        ownersProfile: `https://www.flickr.com/people/${photo.owner}/`,
        title: photo.title,
        individualPhoto: `https://www.flickr.com/photos/${photo.owner}/${photo.id}`,
        description: '',
        tags: [],
        owner: ''
      }      
    })
    
    this.setState({photos: photoArray}, () => {
      this.getPhotoInfo()
    })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Flickr API Task</h1>
          <Form searchPhoto={this.searchPhoto} />
        </header>
        <div className='container'>
          <div className='row'>
            {this.state.photos.map(photo => <div key={photo.id} className="col-md-4" style={{ marginBottom:"2rem" }}><Photo {...photo} /></div>)}
          </div>
        </div>       
      </div>
    )
  }
}

export default App
