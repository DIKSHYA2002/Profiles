import React from 'react'

const Card = (props) => {
  return (
    <div>
        <h1>{props.userid}</h1>  
        <h1>{props.title}</h1> 
        <h1>{props.body}</h1>  
    </div>
  )
}

export default Card