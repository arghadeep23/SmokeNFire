import { useState, useEffect } from 'react'
import Card from "./components/Card";
import alert_level from './alert_level';
import './App.css'

function App() {

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [mqValue, setMqValue] = useState(0);
  const [smoke, setSmoke] = useState(0);
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
  const [alertLevel, setAlertLevel] = useState(0);
  useEffect(() => {
    // creating a bit mask to check the values of temperature, smoke and mqValue
    let bitMask = 0;
    if (temperature > 54) {
      bitMask |= 4;
    }
    if (smoke > 40) {
      bitMask |= 2;
    }
    if (mqValue > 70) {
      bitMask |= 1;
    }
    setAlertLevel(bitMask + 1);
  }, [temperature, smoke, mqValue])
  return (
    <div className=" bg-[#06373f] pt-16">
      <div className="flex flex-wrap md:flex-row justify-center gap-x-20 gap-y-6 items-center">
        <Card data={temperature} content="Temperature" graph="Yes" num="1" />
        <Card data={humidity} content="Humidity" graph="Yes" num="2" />
        <Card data={mqValue} content="Mq Value" graph="No" num="3" />
      </div>
      <div className="flex flex-wrap md:flex-row justify-center gap-x-20 gap-y-6 items-center mt-6">
        <Card data={0} content="Smoke" graph="No" num="3" />
        <Card data={alertLevel} content="Alert Level" graph="No" num="5" />
        <Card data={alert_level[alertLevel]} content="Scenario description" graph="No" num="6" />
      </div>
    </div>
  )
}

export default App
