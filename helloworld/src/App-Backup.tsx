//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import { Card, Button, DatePicker, DatePickerProps } from 'antd';
import Hello from './components/hello';
import Goodbye from './components/goodbye';
import CardCol from './components/CardCol';

function App() {
  //const [count, setCount] = useState(0)
  let counter = 0
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onClick = (event: any) => {
    console.log(counter++)
  }

  return (
    <>
    <Hello name="Web API Dev" />
    
      <div>
        <CardCol />
        <Button type="primary" onClick={onClick}>Button</Button>
        <Button type="primary" danger>Button</Button>

        <br/>
        <DatePicker onChange={onChange} />
      </div>
          
    <Goodbye name="Web API Dev" />
    </>
  )
}

export default App
