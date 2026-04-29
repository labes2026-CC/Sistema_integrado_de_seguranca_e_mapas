"use client";

import dynamic from 'next/dynamic';
import { Share2, Download, ChevronDown, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Importação dinâmica do mapa para evitar erros de SSR
const MapComponent = dynamic(() => import('../../components/mapContainer'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 animate-pulse text-gray-400">
      Carregando mapa interativo...
    </div>
  )
});

interface FilterProps {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const BaseMap = () => {

  const [tipoSelecionado, setTipoSelecionado] = useState("__all__");
  const [anoSelecionado, setAnoSelecionado] = useState("__all__");
  const [distritoSelecionado, setDistritoSelecionado] = useState("__all__");
  const [bairroSelecionado, setBairroSelecionado] = useState("__all__");

  const tiposCrime = [
    "__all__", 
    "Homicídio", 
    "Roubo", 
    "Furto", 
    "Tráfico de Drogas",
    "Feminicídio"
  ];

  const AnosCrime = [
    "__all__", 
    "2025", 
    "2024", 
    "2023", 
    "2022",
    "2021"
  ];

  const DistritosCrime = [
    "__all__", 
    "Centro", 
    "Norte", 
    "Sul", 
    "Leste",
    "Oeste"
  ];

  const BairrosCrime = [
    "__all__", 
    "bairro1", 
    "bairro2", 
    "bairro3", 
    "bairro4",
    "bairro5"
  ];

  return (
    <div className="flex flex-col w-full h-screen bg-[#F3F4F6] p-4 font-sans text-gray-700">
      
      <h1 className="text-4xl font-bold mb-6">Mapa</h1>

      
      <div className="flex flex-wrap items-center gap-4 mb-4 bg-transparent">
        <FilterSelect 
        label="Tipo" 
        options={tiposCrime} 
        selectedValue={tipoSelecionado}
        onSelect={(val) => setTipoSelecionado(val)} 
      />
      <FilterSelect 
        label="Ano" 
        options={AnosCrime} 
        selectedValue={anoSelecionado}
        onSelect={(val) => setAnoSelecionado(val)} 
      />
      <FilterSelect 
        label="Distrito" 
        options={DistritosCrime} 
        selectedValue={distritoSelecionado}
        onSelect={(val) => setDistritoSelecionado(val)} 
      />
      <FilterSelect 
        label="bairro" 
        options={BairrosCrime} 
        selectedValue={bairroSelecionado}
        onSelect={(val) => setBairroSelecionado(val)} 
      />
        
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

const FilterSelect = ({ label, options, selectedValue, onSelect }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o menu se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2 relative" ref={dropdownRef}>
      <span className="text-sm text-gray-500 whitespace-nowrap">{label}:</span>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between min-w-[140px] bg-white border border-gray-300 rounded-md px-3 py-1.5 cursor-pointer hover:border-gray-400 transition-all shadow-sm"
      >
        <span className="text-sm font-medium truncate uppercase">
          {selectedValue === "__all__" ? "Todas" : selectedValue}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>

      {/* Menu de Opções */}
      {isOpen && (
        <div className="absolute top-full left-[calc(100%-140px)] mt-1 w-full min-w-[200px] bg-white border border-gray-200 rounded-md shadow-lg z-[2000] max-h-60 overflow-y-auto">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
              >
                <span className={selectedValue === option ? "font-bold text-blue-600" : ""}>
                  {option === "__all__" ? "Todas" : option}
                </span>
                {selectedValue === option && <Check size={14} className="text-blue-600" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseMap;