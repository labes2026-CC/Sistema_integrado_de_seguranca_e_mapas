"use client";
import React, { useState } from 'react';
import { Menu, X, Stars, Map } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={`${isOpen ? 'w-[120px]' : 'w-20'} 
      transition-all duration-300 ease-in-out bg-white border-r border-gray-200 
      flex flex-col items-center py-[44px] gap-[40px] sticky top-0 h-screen`}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-100 rounded-md">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <nav className="flex flex-col items-center gap-[40px] w-full">
        <Link href="/">
          <NavItem 
            icon={<Stars size={24} />} 
            label="DashBoard" 
            active={pathname === "/"} 
          />
        </Link>
        <Link href="/maps/basemap">
          <NavItem 
            icon={<Map size={24} />} 
            label="Mapas" 
            active={pathname === "/maps/basemap"} 
          />
        </Link>
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <div className={`flex flex-col items-center gap-1 transition-colors cursor-pointer
    ${active ? 'text-blue-600' : 'text-gray-600 hover:text-black'}`}>
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </div>
);

export default Sidebar;