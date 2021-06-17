import React from 'react'
import './Display.css'

const display = props =>{
    return <div className="display" style={{fontSize: props.isZeroDiv? '14px' : '32px'}}><div className="operacao"><span>{props.showPrev? props.prevValue: ''}</span><span>{props.operation}</span></div><div className="main">{props.value}</div></div>
}
    
export default display;