import React, { useState } from 'react';

const api = {
  key: '0b4f7bb5af8d78611da4c4f755e7e0ba',
  base: 'http://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query,setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e)=>{
    if(e.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response=>response.json())
      .then(result => {
        setQuery('');
        setWeather(result)});
    }
  }

  const dateBuilder= (d)=>{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={(typeof weather.main != 'undefined') 
    ? ((weather.main.temp>16) 
    ? 'app warm' : 'app') 
    : 'app'}>
        <main>
          <div className='search-box'>
            <input 
            type='text' 
            className='search-bar' 
            placeholder='Search...'
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyPress={search}>
            </input>
          </div>
          
            {(typeof weather.main !='undefined') ? (
              <div>
                <div className='location-box'>
                    <div className='location'>{weather.name}, {weather.sys.country}</div>
                    <div className='date'>{dateBuilder(new Date())}</div>
                </div>
                <div className='weather-box'>
                  <div className='temp'>{Math.round(weather.main.temp)}°C</div>
                  <div className='weather'>{weather.weather[0].main}</div>
                </div>
              </div>
            ) : ('') }
        </main>
    </div>
  );
}

export default App;
