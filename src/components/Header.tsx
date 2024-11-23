import React from 'react';
import { BarChart2, Download, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://i.imgur.com/MnOXq3t_d.webp?maxwidth=760&fidelity=grand"
              alt="EcoSense Data Logo"
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold">EcoSense Data</h1>
              <p className="text-emerald-200">Environmental Monitoring Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition">
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
            <button className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition">
              <BarChart2 className="w-4 h-4 mr-2" />
              Analytics
            </button>
            <button className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}