import React from 'react';
import { useState, useEffect, useReducer } from 'react'
import Reducer from '../../reducer'
import ItemUpLevel from '../ItemUpLevel/ItemUpLevel'
import { Context } from '../../context'
import './list.css'

export default function List(props) {
  
  const [stateTitleList, dispatchTitle] = useReducer(Reducer, JSON.parse(localStorage.getItem('TitleList')) || [
    {id: 1, title: 'TODO'},
    {id: 2, title: 'In Progress'},
    {id: 3, title: 'Testing'},
    {id: 4, title: 'Done'},
  ])
  useEffect(() => {
    localStorage.setItem('TitleList', JSON.stringify(stateTitleList))
  }, [stateTitleList])
  
  return (      
    <ul className='list'>
      <Context.Provider value={{
                dispatchTitle
            }}>
      {stateTitleList.map(item => <ItemUpLevel author={props.author} key={item.id} title = {item.title} id = {item.id}/>)}
      </Context.Provider>
    </ul>
  )
}