import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = "https://api.openweathermap.org/data/2.5/weather?" //+ lat={lat}&lon={lon}&appid={API key}
const ICON_URL = " http://openweathermap.org/img/wn/"
const API_KEY = ""

export default function Weather({lat, lon}) {
    const [temp, setTemp] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [direction, setDirection] = useState(0)
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')

    useEffect(() => {
        const weather_address = API_URL+
        "lat="+lat+
        "&lon="+lon+
        "&appid="+API_KEY+
        "&units=metric"

        axios.get(weather_address)
        .then(response => {
            console.log(response.data);
            setTemp(response.data.main.temp)
            setSpeed(response.data.wind.speed)
            setDirection(response.data.wind.deg)
            setDescription(response.data.weather[0].description)
            setIcon(ICON_URL+
                response.data.weather[0].icon+
                "@2x.png"
            )
        }).catch(err => {
            alert("Error loading weather data.")
        })
    }, [])

  return (
    <div>
        <h3>Weather</h3>
        <p>{temp.toFixed(1)} C&#176;</p>
        <p>{speed} m/s {direction} degrees</p>
        <p>{description}</p>
        <img src={icon} alt='weather-icon'></img>
    </div>
  )
}
