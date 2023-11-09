import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Todohome() {
    const navigate = useNavigate()

    const clicktoadd = () => {
      navigate('/Todoadd')
    }
    const clicktoaview = () => {
      navigate('/Todoview')
    }
  return (
    <div className='main'>
      <div className='heading'>
        <h2>Employee Portal</h2>
        <div className='homebutton'>
          <button onClick={clicktoadd}>Add Data</button>
          <button onClick={clicktoaview}>View Data</button>
        </div>
      </div>
    </div>
  )
}
