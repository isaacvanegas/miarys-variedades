import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onSearch: (query: string) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, cartCount }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-4 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 cursor-pointer group">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">storefront</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
              Miarys Variedades
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">search</span>
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-slate-100 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-200 sm:text-sm"
                placeholder="Search products, brands and more..."
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link to="/admin" className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="Admin Panel">
               <span className="material-symbols-outlined">admin_panel_settings</span>
            </Link>

            <Link to="/contact" className="hidden sm:flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm shadow-sm shadow-primary/30">
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Contact</span>
            </Link>

            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 size-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button className="size-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-200">
              <img 
                src="https://picsum.photos/100/100" 
                alt="User avatar" 
                className="w-full h-full object-cover" 
              />
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
