import React, {useState} from 'react';
import './App.css';

const api = {
    key: "dad5b9b705f1089ff24ad57f02a7ae9a",
    base: "https://api.openweathermap.org/data/2.5/",
    image_base: 'http://openweathermap.org/img/wn/'
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

    let date = String(new window.Date())
    date = date.slice(3,15)

    const search = evt => {
        if(evt.key === "Enter"){
            fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
                  .then(res => res.json())
                  .then(result => {
                    setWeather(result);
                    setCity('');
                    console.log(result);
                  });

        }
    }
  return (
    <div className="app">
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Type city..."
          onChange={e => {setCity(e.target.value)}}
          value={city}
          onKeyPress={search}
        />
      </div>
        {
            (weather.cod === '404') ? (<div className='wrong-city'>Wrong city</div>) : ''
        }
        {(typeof weather.main != 'undefined') ? (
        <div>
            <div className="location-box">
                <div className='location'>{weather.name}</div>
                <div className='date'>{date}</div>
            </div>
            <div className='weather-box'>
                <div className='degrees'>{Math.round( weather.main.temp)} °c</div>
                <div className='weather-img'>
                    <img alt='weather condition' src={`${api.image_base}${weather.weather[0].icon}@2x.png`}/>
                </div>
                <div className='weather'>{weather.weather[0].main}</div>
            </div>
        </div>
        ) : ''}

    </div>
  );
}

export default App;
