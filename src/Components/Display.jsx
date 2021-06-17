import React from 'react'
import './Display.css'

const display = props =>{
    return <div className="display" style={{fontSize: props.isZeroDiv? '14px' : '32px'}}>{props.value}</div>
}
    
export default display;