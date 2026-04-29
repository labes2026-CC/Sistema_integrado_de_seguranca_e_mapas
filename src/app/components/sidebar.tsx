"use client";

import React, { useState } from 'react';
import { Menu, X, Home, Settings, Stars, Map } from 'lucide-react'; // Biblioteca de ícones
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out
      bg-white border-r border-gray-200 flex flex-col items-center
      w-[120px] h-[916px] py-[44px] pb-[56px] gap-[40px]`}
      style={{ display: 'flex' }}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      
      <nav className="flex flex-col items-center gap-[40px] w-full">
        
        <Link href="/"> <NavItem icon={<Stars size={24} />} label="DashBoard" /> </Link>
        <Link href="/maps/baseMap"> <NavItem icon={<Map size={24} />} label="Mapas" />  </Link>
        
      </nav>
    </aside>
  );
};

// Sub-componente para os itens de navegação
const NavItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <a
    href="#"
    className="flex flex-col items-center gap-1 text-gray-600 hover:text-black transition-colors"
  >
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </a>
);

export default Sidebar;