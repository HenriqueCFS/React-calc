import React, {Component} from 'react'
import './Calculator.css'
import Display from '../Components/Display'
import Button from '../Components/Button'

const initialState ={
    displayValue: 0,
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
    isZeroDiv: false
}
export default class Calculator extends Component{

    state =  { ...initialState}

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigito = this.addDigito.bind(this)
    }
    clearMemory(){
        this.setState({...initialState})
    }
    setOperation(operation){
        if (this.state.isZeroDiv){
            this.clearMemory()
        }else{
            if (this.state.current === 0) {
                this.setState({operation, current: 1, clearDisplay: true})
            }else{
                const finish = operation === "="
                const currentOperation = this.state.operation
                const values = [...this.state.values]
                switch(currentOperation){
                    case '+':
                        values[0] = values[0] + values[1]
                        break;
                    case '-':
                        values[0] = values[0] - values[1]
                        break;
                    case '*':
                        values[0] = values[0] * values[1]
                        break;
                    case '/':
                        if(values[1]===0){
                            values[0] = "Não é possível dividir abacaxis por 0."
                            this.setState({isZeroDiv: true})
                        }else{
                            values[0] = values[0] / values[1]
                        }
                        break
                    default:
                        break
                }
                values[1] = 0
                this.setState({displayValue: values[0],
                            operation: finish ? null : operation,
                            current: finish ? 0 : 1,
                            clearDisplay: !finish,
                            values})
                

            }
        }
    }
    addDigito(n){
        console.log(n)
        if (this.state.isZeroDiv){
            this.clearMemory()
        }else{
            if (n === '.'){
                if (this.state.current === 1 && this.state.values[1] === 0){
                    n = 0+n
                }else{
                    if (String(this.state.displayValue).includes('.')) return
                    n = this.state.displayValue === 0  ? 0 + n : n //Para o ponto não ficar sozinho por conta do clearDisplay    quando state.displayValue === 0
                }
            }
            
            const clearDisplay = String(this.state.displayValue) === '0' || this.state.clearDisplay
            const currentValue = clearDisplay ? '' : this.state.displayValue
            const displayValue = n==='0.'? '0.' : currentValue + n
            this.setState({displayValue, clearDisplay: false})
            if (n !== '.'){
                const i = this.state.current
                const newValue = parseFloat(displayValue)
                const values = [...this.state.values]
                values[i] = newValue
                this.setState({values})
            }
        }
        console.log(this.state.values)
    }
    
    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue} operation={this.state.operation} prevValue={this.state.values[0]} showPrev={this.state.values[1] !== 0} isZeroDiv={this.state.isZeroDiv}/>
                <Button label="AC" triple click={this.clearMemory}/>
                <Button label="/" click={this.setOperation} operation  />
                <Button label="7" click={this.addDigito}/>
                <Button label="8" click={this.addDigito}/>
                <Button label="9" click={this.addDigito}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigito}/>
                <Button label="5" click={this.addDigito}/>
                <Button label="6" click={this.addDigito}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigito}/>
                <Button label="2" click={this.addDigito}/>
                <Button label="3" click={this.addDigito}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" double click={this.addDigito}/>
                <Button label="." click={this.addDigito}/>
                <Button label="=" click={this.setOperation} operation/>


            </div>
        )
    }
}