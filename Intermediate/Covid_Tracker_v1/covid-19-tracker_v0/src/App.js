// https://www.youtube.com/watch?v=cF3pIMJUZxM


import React, { useEffect, useState } from 'react';
import './App.css';
import { 
  MenuItem, FormControl, Select, Card, CardContent
} from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  }, []);


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, // United Kingdom, India, France
            value: country.countryInfo.iso2 // UK, IND, FR
          }
        ))

        setCountries(countries);
      })
    }

    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);

    const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all" 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
      console.log(url);
    
    const getStats = async () => {
      await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      })
    };

    getStats();

  };

  console.log(countryInfo);
 
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid 19 Global Tracker</h1>
          <FormControl className="dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
                {
                  countries.map((country) => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))
                }
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox 
            title="Confirmed" 
            total={countryInfo.cases}
            sub="Today"
            cases={countryInfo.todayCases} 
          />

          <InfoBox 
            title="Active" 
            total={countryInfo.active}
          />

          <InfoBox 
            title="Recovered" 
            total={countryInfo.recovered}
            sub="Today"
            cases={countryInfo.todayRecovered} 
          />

          <InfoBox 
            title="Deceased" 
            total={countryInfo.deaths}
            sub="Today"
            cases={countryInfo.todayDeaths} 
          />
      
        </div>

        <Map />  
      </div>
    

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide New Cases Graph</h3>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
