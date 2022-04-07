import React from 'react';
import { useState, useEffect, useReducer, useContext } from 'react'
import TodoList from '../TodoList/TodoList'
import { Context } from '../../context'
import Reducer from '../../reducer'
import Modal from '../modal/modal';

export default function ItemUpLevel(props) {
  const { dispatchTitle } = useContext(Context)
  const [state, dispatch] = useReducer(Reducer, JSON.parse(localStorage.getItem(props.title)) || [])
  const [todoTitle, setTodoTitle] = useState('')
  const [TitleList, setTitleList] = useState('')
  const [modalTitleList, setModalTitleList] = useState(false)

  useEffect(() => {
    localStorage.setItem(props.title, JSON.stringify(state))
  }, [state])

  const editTitleList = event => {
    if (event.key === 'Enter' && TitleList !== '') {
      dispatchTitle({
        type: 'editTitleList',
        payload: TitleList,
        identifier: props.id
      })
      setTitleList('')
      setModalTitleList(false)
    }
  }

  const addTodo = event => {
    if (event.key === 'Enter' && todoTitle !== '') {
      dispatch({
        type: 'add',
        payload: todoTitle
      })
      setTodoTitle('')
    }
  }
  return (
    <li>
      <div className="input-field">
        <input
          onKeyPress={editTitleList}
          onChange={event => setTitleList(event.target.value)}
          defaultValue={props.title}
          type="text"          
        />
      </div>

      <Context.Provider value={{
        dispatch
      }}
      >
        <div>
          <div className="input-field">
            <input
              type="text"
              value={todoTitle}
              onChange={event => setTodoTitle(event.target.value)}
              onKeyPress={addTodo}
              placeholder='Todo name'
            />
          </div>

          <TodoList author={props.author} todos={state} />
        </div>
      </Context.Provider>
    </li>
  )
}