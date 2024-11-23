import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Droplets } from 'lucide-react';
import DataGrid from './DataGrid';
import { mockAirData, mockWaterData } from '../data/mockData';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'air' | 'water'>('air');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Air Quality Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAirData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="aqi" stroke="#8884d8" />
                <Line type="monotone" dataKey="pm25" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Water Quality Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockWaterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ph" stroke="#ff7300" />
                <Line type="monotone" dataKey="turbidity" stroke="#387908" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex space-x-4 mb-6">
          <button
            className={`flex items-center px-4 py-2 rounded-lg transition ${
              activeTab === 'air'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('air')}
          >
            <Activity className="w-4 h-4 mr-2" />
            Air Quality Data
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg transition ${
              activeTab === 'water'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('water')}
          >
            <Droplets className="w-4 h-4 mr-2" />
            Water Quality Data
          </button>
        </div>
        
        <DataGrid
          data={activeTab === 'air' ? mockAirData : mockWaterData}
          type={activeTab}
        />
      </div>
    </div>
  );
}