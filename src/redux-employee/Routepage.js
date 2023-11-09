import React from 'react'
import Todohome from './Todohome'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Todoadd from './Todoadd';
import Todoview from './Todoview';

export default function Routepage() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={< Todohome/>}/>
            <Route path='/Todoadd' element={<Todoadd/>}/>
            <Route path='/Todoview' element={<Todoview/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}
