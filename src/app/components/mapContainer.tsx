"use client";

import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Exemplo de coordenadas para Belém/PA
const center: [number, number] = [-1.4558, -48.4902];

const defaultMap = ({ data }: any) => {
  return (
    <div className="h-full w-full relative">
      <MapContainer 
        center={center}
        zoom={13} 
        scrollWheelZoom={true} 
        className="h-full w-full z-0"
      >
        {/* TileLayer gratuita do OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Exemplo de como renderizar um polígono de bairro vindo do KML/GeoJSON */}
        <Polygon 
          pathOptions={{ 
            fillColor: '#C81D11', 
            fillOpacity: 0.5, 
            color: 'white', 
            weight: 1 
          }} 
          positions={[
            [-1.450, -48.480],
            [-1.460, -48.480],
            [-1.460, -48.490],
            [-1.450, -48.490],
          ]}
        >
          <Popup>
            <strong>Bairro: Umarizal</strong> <br />
            Ocorrências: 154
          </Popup>
        </Polygon>
      </MapContainer>
    </div>
  );
};

export default defaultMap;