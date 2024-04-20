import { useState, useEffect } from 'react'
import Card from "./components/Card";
import './App.css'

function App() {

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [mqValue, setMqValue] = useState(0);
  useEffect(() => {
    async function apiCall() {
      try {

        const response = await fetch('http://localhost:3000').then(response => response.json());
        console.log(response);
        setTemperature(response.temperature);
        setHumidity(response.humidity);
        setMqValue(response.mq2_value);
      }
      catch (err) {
        console.log(err);
      }
    }
    apiCall();
  }, [])

  return (
    <div className="flex flex-wrap md:flex-row gap-[60px] justify-around items-center mt-24">
      <Card data={temperature} content="Temperature" />
      <Card data={humidity} content="Humidity" />
      <Card data={mqValue} content="Mq Value" />
      {/* <Card data={mqValue} content="Mq Value" /> */}
    </div>
  )
}

export default App
