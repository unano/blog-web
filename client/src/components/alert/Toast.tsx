import React from 'react'
import { useDispatch } from 'react-redux'
import { ALERT } from '../../redux/types/alertType'
import { IoCloseOutline } from 'react-icons/io5'

interface IProps {
  title: string
  body: string | string[]
  bgColor: string
}
const Toast = ({ title, body, bgColor }: IProps) => {
  const dispatch = useDispatch()
  const handleShow = () => {
    dispatch({ type: ALERT, payload: {} })
  }
  return (
    <div className={`toastStyle ${bgColor}`}>
      <div className="toast_title">{title}</div>
      <div>
        {typeof body === 'string' ? (
          body
        ) : (
          <ul>
            {body.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        )}
      </div>
      <div
        onClick={handleShow}
        onKeyUp={handleShow}
        role="button"
        tabIndex={0}
        className="toast_close"
      >
        <IoCloseOutline color="white" />
      </div>
    </div>
  )
}

export default Toast
