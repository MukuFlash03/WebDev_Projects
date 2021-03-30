import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      // rgb: "rgb(204, 16, 52)",
      // half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    active: {
      hex: "#542cb3",
      //rgb: "rgb(125, 215, 29)",
      // half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    recovered: {
      hex: "#7dd71d",
      // rgb: "rgb(125, 215, 29)",
      // half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#999898",
      // rgb: "rgb(251, 68, 67)",
      // half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
  };

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a,b) => a.cases > b.cases? -1 : 1);
}

export const printStat = (stat) => 
  stat 
  ? (Math.sign(stat) === 1 
    ? `+${numeral(stat).format("0.0a")}` 
    : `${numeral(stat).format("0.0a")}`)
  : "0";

  {/*
export const handleInfoHover = (totalCases) => {
  return (
    <Popup>
      <div className="info-container">
        <div className="info-total">Total: {numeral(totalCases).format("0,0")}</div>
      </div>
    </Popup>
  )}
  */}

// Draw circles on map with interactive tooltop
export const showDataOnMap = (data, casesType) => (
    data.map(country => (
        <Circle 
          center={[country.countryInfo.lat, country.countryInfo.long]} 
          fillOpacity={0.4} 
          pathOptions={{
            color: casesTypeColors[casesType].hex,
            fillColor: casesTypeColors[casesType].hex,
          }}
          radius={
              Math.sqrt(country[casesType]/10) * casesTypeColors[casesType].multiplier
          }
        >

          <Popup>
            <div className="info-container">
              <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
              <div className="info-name">{country.country}</div>
              <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
              <div className="info-recovered">Active: {numeral(country.active).format("0,0")}</div>
              <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
              <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
            </div>
          </Popup>
        </Circle>
    ))
)