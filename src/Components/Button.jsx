import React from 'react'
import './Button.css'

const button = props =>
    <button className={`
        button
        ${props.operation? 'operation' : ''}
        ${props.double? 'double' : ''}
        ${props.triple? 'triple' : ''}
        `} onClick={e => props.click && props.click(props.label)}
        >
        {props.label}
        </button>

export default button;