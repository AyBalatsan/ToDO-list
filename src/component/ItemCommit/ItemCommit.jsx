import React, {useContext} from 'react'
import  Button from 'react-bootstrap/Button'
import { Context } from '../../context'
import s from './ItemCommit.css'

export default function ItemCommit({id, title}) {
    const {dispatchCommit} = useContext(Context)
    return (
        <li >
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