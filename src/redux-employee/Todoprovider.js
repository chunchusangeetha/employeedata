import React from 'react'
import { Provider } from 'react-redux';
import Routepage from './Routepage';
import store from './store';
import './Todo.css'


export default function Todoprovider() {
  return (
    <div>
        <Provider store={store}>
            <Routepage/>
        </Provider>
    </div>
  )
}
