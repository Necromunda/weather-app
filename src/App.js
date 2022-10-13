import { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/Weather';

function App() {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos)
        setLat(pos.coords.latitude)
        setLon(pos.coords.longitude)
        setIsLoading(false)
      }, (err) => {
        console.log(err)
        alert("Geolocation failed.")
      })
    } else {
      alert("Turn on geolocation services.")
    }
  }, [])

  if (isLoading) {
    return <p>Loading position...</p>
  } else {
    return (
      <div className='container'>
        <h3>Your position:</h3>
        <p>Latitude: {lat.toFixed(3)}</p>
        <p>Longitude: {lon.toFixed(3)}</p>
        <Weather lat={lat} lon={lon} />
      </div>
    )
  }
}

export default App;
