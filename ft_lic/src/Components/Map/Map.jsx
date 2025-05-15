import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

const SearchControl = ({ onSelect }) => {
  const map = useMap();

  React.useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: true,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      searchLabel: "Caută o locație",
      keepResult: true,
    });

    map.addControl(searchControl);

    const handleResult = (e) => {
      const result = e?.location;
      console.log("📦 Eveniment primit de la geosearch:", e);

      if (!result) return;

      const { x: lon, y: lat } = result;

      const coordinates = {
        lat,
        lon,
      };

      console.log("✅ Coordonate selectate:");
      console.log("Latitudine:", coordinates.lat);
      console.log("Longitudine:", coordinates.lon);

      if (onSelect) {
        onSelect(coordinates);
      }
    };

    map.on("geosearch/showlocation", handleResult);

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation", handleResult);
    };
  }, [map, onSelect]);

  return null;
};

const Map = ({ onLocationSelect }) => {
  return (
    <MapContainer
      center={[45.9432, 24.9668]}
      zoom={6}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchControl onSelect={onLocationSelect} />
    </MapContainer>
  );
};

export default Map;


