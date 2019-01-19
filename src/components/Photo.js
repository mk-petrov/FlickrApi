import React from 'react'
import Tag from './Tag'

const Photo = props => (
  <div className='photo__box'>
    <img className='photo__box-img' src={props.url} alt='props.title' />
    <div className='photo__text'>
      <div>
        <a href={props.individualPhoto} target='blank'><span className='photo__title'>{props.title}</span></a> by
        <a href={props.ownersProfile} target='blank'><span className='photo__owner'> {props.owner || 'Author'}</span></a>
      </div>
      <p className='photo__description'>
        <span className='photo__description-headline'>Description:</span> {props.description || 'No description available'}
      </p>
      <p className='photo__tags'>
        <span className='photo__tags-headline'>Tags:</span>
        {
          props.tags.slice(0, 5).map(tag => <Tag key={tag.id} content={tag} />)
        }
      </p>
    </div>
  </div>
)

export default Photo
