import React from 'react';
import ItemUpLevel from '../ItemUpLevel'
import './list.css'

export default function List(props) {
  const nameItem = [
    {id: 1, title: 'TODO'},
    {id: 2, title: 'In Progress'},
    {id: 3, title: 'Testing'},
    {id: 4, title: 'Done'},
  ]  
    
    return (      
      <ul className='list'>
        {nameItem.map(item => <ItemUpLevel author={props.author} key={item.id} title = {item.title} />)}
      </ul>
    )
  }