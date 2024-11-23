import React from 'react';
import { AirQualityData, WaterQualityData } from '../types';
import { format } from 'date-fns';

interface AnalyticsProps {
  airData: AirQualityData[];
  waterData: WaterQualityData[];
}

export default function Analytics({ airData, waterData }: AnalyticsProps) {
  const calculateAirStats = () => {
    if (!airData.length) return null;
    
    const avgAqi = airData.reduce((sum, d) => sum + d.aqi, 0) / airData.length;
    const avgPm25 = airData.reduce((sum, d) => sum + d.pm25, 0) / airData.length;
    const maxAqi = Math.max(...airData.map(d => d.aqi));
    
    return { avgAqi, avgPm25, maxAqi };
  };

  const calculateWaterStats = () => {
    if (!waterData.length) return null;
    
    const avgPh = waterData.reduce((sum, d) => sum + d.ph, 0) / waterData.length;
    const avgTurbidity = waterData.reduce((sum, d) => sum + d.turbidity, 0) / waterData.length;
    
    return { avgPh, avgTurbidity };
  };

  const airStats = calculateAirStats();
  const waterStats = calculateWaterStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Air Quality Statistics</h3>
        {airStats && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Average AQI</p>
              <p className="text-2xl font-bold">{airStats.avgAqi.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average PM2.5</p>
              <p className="text-2xl font-bold">{airStats.avgPm25.toFixed(1)} µg/m³</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Maximum AQI</p>
              <p className="text-2xl font-bold">{airStats.maxAqi.toFixed(1)}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Water Quality Statistics</h3>
        {waterStats && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Average pH</p>
              <p className="text-2xl font-bold">{waterStats.avgPh.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Turbidity</p>
              <p className="text-2xl font-bold">{waterStats.avgTurbidity.toFixed(2)} NTU</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}