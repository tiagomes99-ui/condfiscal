import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">CondoGuardian</h1>
              <p className="text-xs text-slate-400">Ouvidoria Independente</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-4 text-sm font-medium">
            <span className="text-slate-300 hover:text-white cursor-pointer transition">Como Funciona</span>
            <span className="text-slate-300 hover:text-white cursor-pointer transition">Privacidade</span>
            <span className="text-slate-300 hover:text-white cursor-pointer transition">Contato</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;