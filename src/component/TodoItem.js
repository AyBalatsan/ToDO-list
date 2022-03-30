import React, {useState, useContext, useReducer, useEffect} from 'react'
import { Context } from '../context'
import Modal from './modal/modal'
import Reducer from '../reducer'


export default function TodoItem({title, id, completed, author}) {
  const {dispatch} = useContext(Context)
  const[modalOpen, setModalOpen] = useState(false)
  const cls = ['todo']
  if (completed) {
    cls.push('completed')
  }

  const [stateCommit, dispatchCommit] = useReducer(Reducer, JSON.parse(localStorage.getItem('Commit')) || [])
  const [todoCommit, setTodoCommit] = useState('')
    
  useEffect(() => {
      localStorage.setItem('Commit', JSON.stringify(stateCommit))
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
    <li className={cls.join(' ')}>
      <label >
        <input
          type="checkbox"
          checked={completed}
          onChange={() =>dispatch({
            type: 'toggle',
            payload: id
          })}
        />
        <span onClick={() => setModalOpen(true)}>{title}</span>       
      </label>
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
        <ul>
          {stateCommit.map(item => <li key={item.id}>
            <div>
              {item.title}
              <i
                className="material-icons red-text"
                onClick={() => dispatchCommit({
                  type: 'remove',
                  payload: item.id
                })}
              >
                delete
              </i>
            </div>          
          </li>)}
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