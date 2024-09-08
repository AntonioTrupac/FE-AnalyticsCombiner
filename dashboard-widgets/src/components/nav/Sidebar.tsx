import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, BarChart2, Settings, HelpCircle } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const navItems: NavItem[] = [
  { icon: <Home size={20} />, label: 'Home', to: '/' },
  { icon: <BarChart2 size={20} />, label: 'Analytics', to: '/analytics' },
  { icon: <Settings size={20} />, label: 'Settings', to: '/settings' },
  { icon: <HelpCircle size={20} />, label: 'Help', to: '/help' },
];

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => (
  <div
    className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
  >
    <div className="flex items-center justify-between p-4">
      <span className="text-2xl font-semibold">Dashboard</span>
      <button
        onClick={toggleSidebar}
        className="p-1 rounded-md hover:bg-gray-700 lg:hidden"
      >
        <X size={24} />
      </button>
    </div>
    <nav className="mt-8">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <span className="mr-3">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  </div>
);
