import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({ filter, changeFilterHandler }) => (
  <div>
    find countries
    <input value={filter} onChange={changeFilterHandler}/>
  </div>
)

const Weather = ({ weather }) => (
  <div>
    <h2>Weather in {weather.request.query}</h2>
    <p><b>temperature:</b> {weather.current.temperature} Celsius</p>
    <img src={weather.current.weather_icons[0]} alt='weather_icon'/>
    <p><b>wind:</b> {weather.current.wind_speed} kmh direction {weather.current.wind_dir}</p>
  </div>
)

const VerboseCountry = ({ country }) => {
  const [weather, setWeather] = useState({})

  const api_key = process.env.REACT_APP_API_KEY
  // [by default] &units=m (temperature: Celsius, wind speed: kmh)
  const weather_url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`
  
  useEffect(() => {
    axios
      .get(weather_url)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt='flag' width='200'/>
      {Object.keys(weather).length !== 0 ?
        <Weather weather={weather} /> :
        null
      }
    </div>
  )
}


const Country = ({ country, verbose }) => {
  const [countryToShow, setCountryToShow] = useState('')
  const showCountry = country.name === countryToShow

  const handleClick = () => {
    setCountryToShow(country.name)
  }

  if (!verbose) {
    return (
      <div>
        <span>{country.name}</span>
        <button onClick={handleClick}>show</button>
        {showCountry ?
          <VerboseCountry country={country} /> :
          null
        }
      </div>
    )
  }
  return (
    <VerboseCountry country={country} />
  )
}

const SearchResult = ({ countries, setFilterState }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length > 1) {
    return countries.map(country =>
      <Country key={country.name} country={country} verbose={false} />
    )
  }
  return countries.map(country =>
    <Country key={country.name} country={country} verbose={true} />
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  // this function filters countries according to the current filter value
  const filterCountries = (filter) => {
    return countries.filter(
      country => {
        const re = new RegExp(filter, 'i')
        return country.name.match(re)
      }
    )
  }

  const handleFilterChange = e => {
    const filter = e.target.value
    setFilter(filter)
    setFilteredCountries(filterCountries(filter))
  }

  return(
    <div>
      <Filter filter={filter} changeFilterHandler={handleFilterChange} />
      <SearchResult countries={filteredCountries} />
    </div>
  )
}

export default App;
