import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Activity, Camera, BarChart2, Settings as SettingsIcon, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Activity, group: 'COMMAND CENTER' },
    { name: 'New Inspection', path: '/inspections/new', icon: Camera, group: 'INSPECTION' },
    { name: 'History', path: '/inspections', icon: Shield, group: 'INSPECTION' },
    { name: 'Analytics', path: '/analytics', icon: BarChart2, group: 'ANALYTICS' },
    { name: 'Settings', path: '/settings', icon: SettingsIcon, group: 'SYSTEM' },
  ];

  return (
    <div className="w-64 h-full bg-panel border-r border-border flex flex-col pt-6 relative z-10 shadow-[5px_0_15px_rgba(0,0,0,0.5)]">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/20 border border-primary flex items-center justify-center rounded-sm">
          <Shield size={18} className="text-primary" />
        </div>
        <div className="font-mono text-xl tracking-wider text-white font-bold">
          INSPECT<span className="text-primary">AI</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 no-scrollbar">
        {['COMMAND CENTER', 'INSPECTION', 'ANALYTICS', 'SYSTEM'].map((group) => (
          <div key={group} className="mb-6">
            <div className="text-[10px] font-mono text-gray-500 mb-2 px-2 tracking-[0.2em]">{group}</div>
            {navItems.filter(item => item.group === group).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-2.5 mb-1 text-sm font-mono transition-all duration-300 border-l-2
                  ${isActive 
                    ? 'border-primary bg-primary/10 text-white shadow-[inset_2px_0_10px_rgba(0,210,255,0.1)]' 
                    : 'border-transparent text-gray-400 hover:border-gray-500 hover:bg-white/5 hover:text-gray-200'}
                `}
              >
                <item.icon size={16} className="group-[.active]:text-primary" />
                {item.name}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full text-sm font-mono text-gray-400 hover:text-white hover:bg-error/10 border-l-2 border-transparent hover:border-error transition-all"
        >
          <LogOut size={16} />
          SYSTEM LOGOUT
        </button>
      </div>
    </div>
  );
};
