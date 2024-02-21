"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import countriesInfo from "../../lib/utils/countries.json";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import styles from "./Map.module.css";

interface MapProps {
  center: [number, number];
  zoom: number;
}

const Map: React.FC<MapProps> = ({ center, zoom }) => {
  const [countriesData, setCountriesData] = React.useState<any>([]);

  useEffect(() => {
    setCountriesData(
      countriesInfo.countries.map((country) => {
        return {
          ...country,
          Coordinates: [country.Latitude, country.Longitude],
        };
      })
    );
  }, []);

  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full rounded-xl p-4 bg-neutral-50 shadow-md">
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {countriesData &&
            countriesData.map(({ Coordinates, Country, ISOCode }: any) => {
              return (
                <Marker key={Country} position={Coordinates}>
                  <Popup className="w-[300px] h-[150px]">
                    <p className="text-[14px]">name: {Country}</p>
                    <p className="text-[14px]">ISO: {ISOCode}</p>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    </section>
  );
};

export default Map;
