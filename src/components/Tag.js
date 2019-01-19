import React from 'react'

const style = {
  backgroundColor: '#eee',
  border: '1px solid #a09f9f',
  borderRadius: '2px',
  margin: '2px',
  padding: '1px 3px',
  content: 'justify'
}

const Tag = props => <span style={style}> {props.content._content} </span>

export default Tag
