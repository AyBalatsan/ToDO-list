import React from 'react'
import Button from 'react-bootstrap/Button'
import './ItemCommit.css'

export default function ItemCommit({id, title, dispatchCommit}) {

  return (
    <li className='blockCommitItem'>
      <div className='blockCommit'>
        <p className='blockCommit__title'>{title}</p>
        <Button
          className="material-icons red-text"
          onClick={() => dispatchCommit({
            type: 'remove',
            payload: id
          })}
        >
          Del
        </Button>
      </div>
    </li>
  )
}