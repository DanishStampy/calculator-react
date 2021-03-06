import { useState, useEffect } from 'react';
import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {

    //to prevent entering 2 or more operators back-to-back
    // Ex: 2+/* , true then return
    // Ex: 2+3 , false then continue
    if(ops.includes(value) && calc === '' ||
        ops.includes(value) && ops.includes(calc.slice(-1))){
          return;
        }

    setCalc(calc + value);

    if(!ops.includes(value)){
      setResult(eval(calc + value).toString());
    }
  }

  const createDigits = () => {
    const digits = [];

    for(let i = 1; i < 10; i++){
      digits.push(
        <button onClick={() => updateCalc(i.toString()) } key={i}>{i}</button>
      )
    }

    return digits;

  }

  const calculate = () =>{
    setCalc(eval(calc).toString());
  }

  const deleteLast = () =>{
    if(calc === '') return;
    
    const value = calc.slice(0 ,-1);
    setCalc(value);
  }

  useEffect( () => {
    AOS.init({
      offset: 200,
      duration: 1000,
      easing: 'ease-out'
    })
  })

  return (
    <div className="App">
      <div className="note" data-aos="fade-down">
        <p>
          Hi, this is my first beginner ReactJs project. A simple calculator with basic functions. It still need some upgrade.
        </p>
      </div>
      <div className="calculator" data-aos="fade-down">
        <div className="display">
          { result ? <span>({result})</span> : '' }&nbsp;
          { calc || "0"}
        </div>

        <div className="operators">
          <button onClick={() => updateCalc('/') }>/</button>
          <button onClick={() => updateCalc('*') }>*</button>
          <button onClick={() => updateCalc('+') }>+</button>
          <button onClick={() => updateCalc('-') }>-</button>

          <button onClick={ deleteLast }>DEL</button>
        </div>

        <div className="digits">
          { createDigits() }
          <button onClick={() => updateCalc('0') }>0</button>
          <button onClick={() => updateCalc('.') }>.</button>
          <button onClick={ calculate }>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
