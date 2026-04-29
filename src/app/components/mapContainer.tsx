"use client";

import { MapContainer, TileLayer, Polygon, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AlertTriangle, CalendarDays, Clock, Hand, HelpingHand, Leaf, MapPin, PackageX, Rat, Skull, Syringe, Zap } from 'lucide-react';
import { renderToString } from 'react-dom/server';
import React, { useMemo } from 'react';

// Exemplo de coordenadas para Belém/PA
const center: [number, number] = [-1.4558, -48.4902];

// 1. Mapeamento de Cores por "Bucket" de Horário (Baseado no seu arquivo base)
const bucketColors: { [key: string]: string } = {
  red: "#ff0000",    // 18:01–00:00
  orange: "#ff9800", // 12:01–18:00
  green: "#8bc34a",  // 06:01–12:00
  yellow: "#ffeb3b", // 00:01–06:00 (Talvez precise de texto preto para contraste)
};

// 2. Mapeamento de Ícones por Tipo de Crime
const crimeIcons: { [key: string]: React.ReactNode } = {
  homicidio: <Skull size={18} className="text-white" />,
  roubo: <Hand size={18} className="text-white" />,
  furto: <PackageX size={18} className="text-white" />,
  trafico_de_drogas: <HelpingHand size={18} className="text-white" />,
  // Padrão para crimes não listados
  default: <Syringe size={18} className="text-white" />,
};

const createCrimeIcon = (type: string, bucket: string) => {
  const color = bucketColors[bucket] || "#9ca3af";
  const iconComponent = crimeIcons[type] || crimeIcons.default;
  const iconHtml = renderToString(iconComponent as React.ReactElement);

  // Aqui é HTML puro (string), então o style="background-color: ..." funciona.
  const htmlTemplate = `
    <div class="relative flex items-center justify-center">
      <div class="flex items-center justify-center w-9 h-9 rounded-full shadow-lg border-2 border-white" 
           style="background-color: ${color};">
        ${iconHtml}
      </div>
      <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 
           border-l-[6px] border-l-transparent 
           border-r-[6px] border-r-transparent 
           border-t-[8px]" 
           style="border-t-color: ${color};">
      </div>
    </div>
  `;

  return L.divIcon({
    html: htmlTemplate,
    className: '',
    iconSize: [36, 42],
    iconAnchor: [18, 42],
    popupAnchor: [0, -42],
  });
};

interface Ocorrencia {
  id: number;
  lat: number;
  lng: number;
  tipo: string; // ex: 'homicidio'
  data: string; // ex: '15/05/2024'
  horario: string; // ex: '22:30'
  bairro: string;
  bucket_horario: string; // ex: 'red' (calculado no pré-processamento do CSV)
}

interface MapProps {
  ocorrencias: Ocorrencia[]; // Dados filtrados vindos do CSV
  // geoJsonData?: any; // Dados dos polígonos dos bairros (opcional para este exemplo)
}

const DefaultMap: React.FC<MapProps> = ({ ocorrencias }) => {

  // Memoriza os marcadores para evitar re-renderização desnecessária
  const markers = useMemo(() => {
    return ocorrencias.map((ocr) => {
      // Cria o ícone específico para esta ocorrência
      const customIcon = createCrimeIcon(ocr.tipo, ocr.bucket_horario);

      return (
        <Marker
          key={ocr.id}
          position={[ocr.lat, ocr.lng]}
          icon={customIcon}
        >
          <Popup className="crime-popup">
            <div className="p-1 font-sans text-gray-800">
              <div className="flex items-center gap-2 mb-2">

                <div
                  className="p-1.5 rounded-md"
                  style={{ backgroundColor: bucketColors[ocr.bucket_horario] || '#9ca3af' }}
                >
                  {crimeIcons[ocr.tipo] || crimeIcons.default}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-tight">
                  {ocr.tipo.replace(/_/g, ' ')}
                </h3>
              </div>

              <div className="space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-2">
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-gray-400" />
                  <span>{ocr.data} às {ocr.horario}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="font-medium text-gray-700">{ocr.bairro}</span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      );
    });
  }, [ocorrencias]);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Padrão colorido
        //url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Versão Clara (melhor contraste para os ícones)
        />

        {/* Exemplo de como renderizar um polígono de bairro vindo do KML/GeoJSON */}
        {/* <Polygon 
//           pathOptions={{ 
//             fillColor: '#C81D11', 
//             fillOpacity: 0.5, 
//             color: 'white', 
//             weight: 1 
//           }} 
//           positions={[
//             [-1.450, -48.480],
//             [-1.460, -48.480],
//             [-1.460, -48.490],
//             [-1.450, -48.490],
//           ]}
//         > */}
        {/* <Popup>
//             <strong>Bairro: Umarizal</strong> <br />
//             Ocorrências: 154
//           </Popup>
//         </Polygon> */}

        {/* <GeoJSON data={geoJsonData} style={geoJsonStyle} /> */}


        {markers}

      </MapContainer>
    </div>
  );
};

export default DefaultMap;