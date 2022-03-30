import React, { useState } from 'react';
import './App.css';
import List from './component/ListMain/List';
import Modal from './component/modal/modal';
import Form from 'react-bootstrap/Form'
import  Button from 'react-bootstrap/Button'

function App() {
  const[modalActive, setModalActive] = useState(true)
  const[nameUser, setNameUser] = useState('')
  
  return (
    <div className="App">
      <div className='App__wrapper'>
        <h1 className='App__title'>TODO list</h1>
        <Modal active={modalActive} setActive={setModalActive}>
          <Form.Label htmlFor="inputName">Впишите свое имя</Form.Label>
            <Form.Control
              type="text"
              id="inputName"
              aria-describedby="passwordHelpBlock"
              value={nameUser}
              onChange={event => setNameUser(event.target.value)}
            />
          <Form.Text id="passwordHelpBlock" muted>
            Оно будет отображатся как автор задач
          </Form.Text>
          <div className="modal__block-button">
            <Button onClick={() => setModalActive(false)}>Ок</Button>
          </div>          
        </Modal>
        <List author = {nameUser}  setAuthor = {setNameUser}/>
      </div>
    </div>
  );
}

export default App;
