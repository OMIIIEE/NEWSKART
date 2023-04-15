import React, { Component } from 'react'
import Spin from './Spin.gif'

export class Spinner extends Component {
render(){
    return (
        <div className='text-center'>
            <img src={Spin} alt="loading"/>
        </div>
    )
}
}

export default Spinner