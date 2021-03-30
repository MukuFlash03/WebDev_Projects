// https://www.youtube.com/watch?v=cF3pIMJUZxM
// https://github.com/CleverProgrammers/react-covid-tracker
// https://github.com/ShinAKS/covid-19-tracker


import React, { useEffect, useState } from 'react';
import './App.css';
import './Table.css';
import { 
  MenuItem, FormControl, Select, Card, CardContent
} from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData, printStat } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

// Fetch worldwide stats for setting stats on initial pageload
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
      setCountry('worldwide');
    });
  }, []);


  // Fetch country name and code for setting dropdown menu options
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

        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      })
    }

    getCountriesData();
  }, []);


  // Fetch country stats on clicking option in dropdown
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);

    const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all" 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
      console.log(url);
    
    // Fetch country stats on clicking option in dropdown
    const getStats = async () => {
      await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        countryCode === "worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);

        setMapZoom(4);
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
          <FormControl className="app_dropdown">
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
            isRed
            current={casesType === 'cases'}
            onClick = {(e) => {
                setCasesType('cases')
                console.log(`InfoBox: ${casesType}`);
              }
            }
            title="Confirmed" 
            total={printStat(countryInfo.cases)}
            cases={printStat(countryInfo.todayCases)} 
            //onMouseEnter={handleInfoHover(countryInfo.cases)}
          />

          <InfoBox
            isPurple 
            current={casesType === 'active'}
            onClick = {(e) => {
                setCasesType('active')
                console.log(`InfoBox: ${casesType}`);
              }
            }
            title="Active" 
            total={printStat(countryInfo.active)}
            cases={printStat(countryInfo.todayCases-countryInfo.todayRecovered-countryInfo.todayDeaths)}
            //onMouseEnter={handleInfoHover(countryInfo.active)}
          />

          <InfoBox 
            isGreen
            current={casesType === 'recovered'}
            onClick = {(e) => {
                setCasesType('recovered')
                console.log(`InfoBox: ${casesType}`);
              }
            }
            title="Recovered" 
            total={printStat(countryInfo.recovered)}
            cases={printStat(countryInfo.todayRecovered)}
            //onMouseEnter={handleInfoHover(countryInfo.recovered)} 
          />

          <InfoBox 
            isGrey 
            current={casesType === 'deaths'}
            onClick = {(e) => {
                setCasesType('deaths')
                console.log(`InfoBox: ${casesType}`);
              }
            }
            title="Deceased" 
            total={printStat(countryInfo.deaths)}
            cases={printStat(countryInfo.todayDeaths)}
            //onMouseEnter={handleInfoHover(countryInfo.deaths)} 
          />
      
        </div>

        <Map 
          casesType={casesType}
          countries={mapCountries} 
          center={mapCenter} 
          zoom={mapZoom}
        />  
      </div>
    

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app_graphTitle">{country === 'worldwide' ? country : countryInfo.country} New {casesType}</h3>
          <LineGraph className="app_graph" casesType={casesType} countryCode={country}/>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
