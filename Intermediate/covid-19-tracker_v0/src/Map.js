import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, caseType, center, zoom }) {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  console.log(caseType);

  return (
    <MapContainer
      caseType={caseType}
      className="map"
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
    >
    <ChangeView center={center} zoom={zoom} />
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    {showDataOnMap(countries, caseType)}
    </MapContainer>
  );
}

export default Map;