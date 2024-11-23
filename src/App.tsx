import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="py-8">
        <Dashboard />
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">EcoSense Data</h3>
              <p className="text-gray-400">Environmental Monitoring Dashboard</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">Data Sources: Cairo Environmental Protection Agency</p>
              <p className="text-sm text-gray-400">© 2024 EcoSense Data. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;