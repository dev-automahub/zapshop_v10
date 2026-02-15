
import React from 'react';
import { Menu, Search, Sun, Moon, LogIn, User, LogOut } from 'lucide-react';
import { Customer } from '../../types';

interface HeaderProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  onLoginClick?: () => void;
  currentShopCustomer?: Customer | null;
  onShopLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    toggleSidebar, 
    isDarkMode, 
    toggleTheme, 
    isLoggedIn, 
    currentShopCustomer,
    onShopLogout
}) => {

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm p-4 h-16 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center flex-1 gap-4">
        {/* Hamburger for Mobile CRM */}
        {isLoggedIn && (
            <button onClick={toggleSidebar} className="text-neutral-medium dark:text-gray-400 md:hidden">
                <Menu size={24} />
            </button>
        )}

        {/* Search Bar */}
        <div className="relative w-full max-w-xs hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-medium dark:text-gray-400" />
          <input
            type="text"
            placeholder={isLoggedIn ? "Busca global..." : "Buscar produtos..."}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-full bg-neutral-light dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-4">
        {currentShopCustomer && (
            <div className="hidden md:flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 py-1.5 px-3 rounded-full">
                <span className="mr-2 truncate max-w-[150px]">Olá, {currentShopCustomer.name.split(' ')[0]}</span>
                {onShopLogout && (
                    <button onClick={onShopLogout} className="text-xs text-danger hover:underline flex items-center ml-1 pl-2 border-l border-gray-300 dark:border-gray-600">
                        <LogOut size={12} className="mr-1"/> Sair
                    </button>
                )}
            </div>
        )}

        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-neutral-medium dark:text-gray-400 transition-colors duration-200"
          aria-label="Alternar tema"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {!isLoggedIn && currentShopCustomer && onShopLogout && (
             <button 
                onClick={onShopLogout}
                className="md:hidden p-2 text-neutral-medium dark:text-gray-400"
            >
                <LogOut size={20} />
            </button>
        )}
      </div>
    </header>
  );
};

export default Header;
