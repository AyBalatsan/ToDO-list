import React, {useEffect,} from "react";
import './modal.css'

const Modal = ({active, setActive, children}) => {

  const closeModal = (e) => {
    if (e.key === 'Escape') {
      setActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => closeModal(e))
    return () => document.removeEventListener('keydown', closeModal);
  }, [])

  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        <button className='modal__button' onClick={() => setActive(false)}>+</button>
        {children}
      </div>
    </div>
  )
}

export default Modal;