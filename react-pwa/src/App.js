import React, { useState } from 'react'

import { fetchWeather } from './api/FetchWeather'
import './App.css'

import About from './About'
import Users from './Users'

import { Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom'

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if(e.key === 'Enter') {
      const data = await fetchWeather(query)
      setWeather(data)
      setQuery('')
    }
  }

  return (
    <div className="main-container">
      <h1 style={{color: 'white'}}>Input a city to find out it's current weather</h1>
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      <Router>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
        <Routes>
          <Route path="/about" element={<About />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
      </Router>
      <About />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img className="city-info" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App