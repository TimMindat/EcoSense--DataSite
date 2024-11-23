import React from 'react';
import { AirQualityData, WaterQualityData } from '../types';
import { format } from 'date-fns';

interface DataGridProps {
  data: (AirQualityData | WaterQualityData)[];
  type: 'air' | 'water';
}

export default function DataGrid({ data, type }: DataGridProps) {
  const headers = type === 'air' 
    ? ['Timestamp', 'AQI', 'CO', 'NO', 'NO2', 'O3', 'SO2', 'PM2.5', 'PM10', 'NH3']
    : ['Timestamp', 'pH', 'Conductivity', 'Turbidity'];

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
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
  );
}