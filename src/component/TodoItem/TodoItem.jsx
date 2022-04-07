import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Context } from '../../context'
import Modal from '../modal/modal'
import ItemCommit from '../ItemCommit/ItemCommit'
import Reducer from '../../reducer'
import message from './img/email.png'
import './TodoItem.css'


export default function TodoItem({ title, id, author }) {
  const { dispatch } = useContext(Context)
  const [modalOpen, setModalOpen] = useState(false)
  const [stateCommit, dispatchCommit] = useReducer(Reducer, JSON.parse(localStorage.getItem('Commit' + id)) || [])
  const [todoCommit, setTodoCommit] = useState('')

  useEffect(() => {
    localStorage.setItem('Commit' + id, JSON.stringify(stateCommit))
  }, [stateCommit])

  const addTodoCommit = event => {
    if (event.key === 'Enter' && todoCommit !== '') {
      dispatchCommit({
        type: 'addCommit',
        payload: todoCommit
      })
      setTodoCommit('')
    }
  }

  return (
    <li className='todo' onClick={() => setModalOpen(true)}>
      <p className='todo__title'>{title}</p>
      <div className="blockMessage">
        <img className="blockMessage__img" src={message} alt='message' />
        <p className="blockMessage__number">{stateCommit.length}</p>
      </div>
      <Modal active={modalOpen} setActive={setModalOpen}>
        <h3>{title}</h3>
        <p>Автор поста: {author}</p>
        <p>Description</p>
        <input
          type='text'
          value={todoCommit}
          onChange={event => setTodoCommit(event.target.value)}
          onKeyPress={addTodoCommit}
          placeholder='Add comment'
        >
        </input>
        <ul className='blockCommitList'>
          {stateCommit.map(item => <ItemCommit key={item.id} {...item} dispatchCommit={dispatchCommit} />)}
        </ul>
        <i
          className="material-icons red-text"
          onClick={() => dispatch({
            type: 'remove',
            payload: id
          })}
        >
          delete post
        </i>
      </Modal>
    </li>
  )
}