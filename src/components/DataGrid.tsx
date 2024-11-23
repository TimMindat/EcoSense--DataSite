import React, { useState } from 'react';
import { AirQualityData, WaterQualityData } from '../types';
import { format } from 'date-fns';
import { Search, Filter, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { exportToCSV } from '../utils/export';

interface DataGridProps {
  data: (AirQualityData | WaterQualityData)[];
  type: 'air' | 'water';
  startDate: Date;
  endDate: Date;
}

interface FilterRange {
  min: string;
  max: string;
}

interface Filters {
  [key: string]: FilterRange;
}

export default function DataGrid({ data, type, startDate, endDate }: DataGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({});
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'timestamp', direction: 'desc' });

  const headers = type === 'air' 
    ? ['Timestamp', 'AQI', 'CO', 'NO', 'NO2', 'O3', 'SO2', 'PM2.5', 'PM10', 'NH3']
    : ['Timestamp', 'pH', 'Conductivity', 'Turbidity'];

  const keys = type === 'air'
    ? ['timestamp', 'aqi', 'co', 'no', 'no2', 'o3', 'so2', 'pm25', 'pm10', 'nh3']
    : ['timestamp', 'ph', 'conductivity', 'turbidity'];

  const handleFilterChange = (key: string, type: 'min' | 'max', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: value
      }
    }));
  };

  const filteredData = data.filter(row => {
    // Text search
    const matchesSearch = Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Numeric filters
    const matchesFilters = Object.entries(filters).every(([key, range]) => {
      if (!range.min && !range.max) return true;
      const value = row[key as keyof typeof row] as number;
      const min = range.min ? parseFloat(range.min) : -Infinity;
      const max = range.max ? parseFloat(range.max) : Infinity;
      return value >= min && value <= max;
    });

    return matchesSearch && matchesFilters;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleExport = () => {
    exportToCSV(sortedData, type, startDate, endDate);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {showFilters ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </button>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          {keys.filter(key => key !== 'timestamp').map(key => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {key.toUpperCase()}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters[key]?.min || ''}
                  onChange={(e) => handleFilterChange(key, 'min', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters[key]?.max || ''}
                  onChange={(e) => handleFilterChange(key, 'max', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={header}
                  onClick={() => handleSort(keys[index])}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    {sortConfig.key === keys[index] && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(row.timestamp), 'yyyy-MM-dd HH:mm')}
                </td>
                {Object.entries(row)
                  .filter(([key]) => key !== 'timestamp')
                  .map(([key, value]) => (
                    <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {typeof value === 'number' ? value.toFixed(2) : value}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}