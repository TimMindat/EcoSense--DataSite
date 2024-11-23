import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, Droplets } from 'lucide-react';
import { subYears } from 'date-fns';
import DataGrid from './DataGrid';
import SearchBar from './SearchBar';
import Analytics from './Analytics';
import Chart from './Chart';
import { fetchAirQualityData, fetchWaterQualityData } from '../services/api';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'air' | 'water'>('air');
  const [startDate, setStartDate] = useState(subYears(new Date(), 4));
  const [endDate, setEndDate] = useState(new Date());
  const [showAnalytics, setShowAnalytics] = useState(false);

  const { data: airData = [] } = useQuery({
    queryKey: ['airQuality', startDate, endDate],
    queryFn: () => fetchAirQualityData(startDate, endDate),
  });

  const { data: waterData = [] } = useQuery({
    queryKey: ['waterQuality', startDate, endDate],
    queryFn: () => fetchWaterQualityData(startDate, endDate),
  });

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
      />

      {showAnalytics ? (
        <Analytics airData={airData} waterData={waterData} />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Chart
              data={airData}
              title="Air Quality Trends"
              lines={[
                { key: 'aqi', color: '#8884d8', name: 'AQI' },
                { key: 'pm25', color: '#82ca9d', name: 'PM2.5' }
              ]}
            />
            <Chart
              data={waterData}
              title="Water Quality Metrics"
              lines={[
                { key: 'ph', color: '#ff7300', name: 'pH' },
                { key: 'turbidity', color: '#387908', name: 'Turbidity' }
              ]}
            />
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
              data={activeTab === 'air' ? airData : waterData}
              type={activeTab}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </>
      )}
    </div>
  );
}