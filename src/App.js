import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';

function App() {

const [loading, setLoading] = useState(null);  

const [coords, setCoords] = useState(null);

const [current, setCurrent] = useState( {
  is_day:'',
  temp_c: '',
  icon: '',
});

const [location, setLocation] = useState ({
  name:'',
  country: '',
  region: '',
});

const getLocation = () => {
  if(!navigator.geolocation) {
    alert('Geolocation Yok')
  } else {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords(`${position.coords.latitude}, ${position.coords.longitude}`)
    });
  }
}

useEffect(() => {
  setLoading(true);
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=a1bdb50b99074f12be2140610221102&q=${coords}&aqi=no
  `;
  fetch(apiURL).then(res => res.json()).then((data) => {
    setCurrent({
      is_day:data.current.is_day,
      temp:data.current.temp_c,
      icon:data.current.condition.icon,
    });
    setLocation({
      name:data.location.name,
      country:data.location.country,
      region:data.location.region,
    });
    setLoading(false);
  })
},[coords]);

  return (
    <div className="App">
      <button className='button' onClick={getLocation}>Hava Durumunu Getir</button>

      {!loading &&
      <div>
      <div className='weather'>
        <img src={current.icon} alt="icon" />
        <div>
          Sıcaklık
        <span>{current.temp}</span>
        </div>
      </div>

      <div className='location'>
        <span>{location.region}</span> - <span>{location.country}</span>
      </div>
    </div>
    }
    {loading && <div className='loading'><span>Yükleniyor...</span></div>}

    </div>
  );
}

export default App;
