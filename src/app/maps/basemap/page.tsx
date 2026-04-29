"use client";

import dynamic from 'next/dynamic';
import { Share2, Download, ChevronDown } from 'lucide-react';

// Importação dinâmica do mapa para evitar erros de SSR
const MapComponent = dynamic(() => import('../../components/mapContainer'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 animate-pulse text-gray-400">
      Carregando mapa interativo...
    </div>
  )
});

const BaseMap = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-[#F3F4F6] p-4 font-sans text-gray-700">
      
      <h1 className="text-4xl font-bold mb-6">Mapa</h1>

      
      <div className="flex flex-wrap items-center gap-4 mb-4 bg-transparent">
        <FilterSelect label="Tipo" value="Todas" />
        <FilterSelect label="Ano" value="2024" />
        <FilterSelect label="Distrito" value="Todos" />
        <FilterSelect label="Bairro" value="Todos" />
        
        <div className="flex gap-2 ml-auto">
          <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
            <Share2 size={20} />
          </button>
          <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="relative flex-grow w-full border-2 border-[#0091FF] rounded-sm overflow-hidden shadow-inner">
        
        
        <MapComponent />

        {/* <div className="absolute bottom-6 right-6 w-56 bg-white/95 backdrop-blur-sm p-4 shadow-xl border border-gray-200 rounded-sm z-[1000]">
          <h3 className="font-bold text-gray-600 mb-4 text-xs leading-tight uppercase tracking-wider">
            Mapa de seguimentos Periculosos
          </h3>
          
          <div className="flex items-center gap-3">
            <div className="w-6 h-28 bg-gradient-to-t from-[#70B5F9] via-[#7DFF2E] via-[#FFFF00] via-[#FF7F00] to-[#C81D11] rounded-full" />
            <div className="flex flex-col justify-between h-28 text-[9px] font-bold text-gray-500 uppercase">
              <span>Alta</span>
              <span>Média</span>
              <span>Baixa</span>
            </div>
          </div>
          
          <p className="mt-4 text-[9px] text-gray-400 italic">
            Cálculo baseado em todas as ocorrências (2026)
          </p>
        </div> */}
      </div>

      {/* Timeline Inferior */}
      <div className="mt-6 w-full px-2">
        <div className="flex justify-between text-lg font-bold mb-2">
          <span>2025</span>
          <span>2026</span>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-[#3B82F6] rounded-l-full" />
          <div className="absolute top-[-8px] left-1/2 w-1 h-[24px] bg-[#3B82F6] shadow-sm" />
        </div>
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-500">{label}:</span>
    <div className="flex items-center justify-between min-w-[120px] bg-white border border-gray-300 rounded-md px-3 py-1.5 cursor-pointer hover:border-gray-400 transition-all">
      <span className="text-sm font-medium">{value}</span>
      <ChevronDown size={16} className="text-gray-400" />
    </div>
  </div>
);

export default BaseMap;