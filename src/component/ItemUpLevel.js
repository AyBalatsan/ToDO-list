import React from 'react';
import { useState, useEffect, useReducer } from 'react'
import TodoList from './TodoList'
import { Context } from '../context'
import Reducer from '../reducer'

export default function ItemUpLevel(props) {
    const [state, dispatch] = useReducer(Reducer, JSON.parse(localStorage.getItem(props.title)) || [])
    const [todoTitle, setTodoTitle] = useState('')
    
    useEffect(() => {
        localStorage.setItem(props.title, JSON.stringify(state))
    }, [state])

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
            <h2>{props.title}</h2>
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