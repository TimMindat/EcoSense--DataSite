import { AirQualityData, WaterQualityData } from '../types';

const API_BASE_URL = 'https://api.openaq.org/v2';

export async function fetchAirQualityData(startDate: Date, endDate: Date): Promise<AirQualityData[]> {
  const params = new URLSearchParams({
    city: 'Cairo',
    country: 'EG',
    limit: '1000',
    date_from: startDate.toISOString(),
    date_to: endDate.toISOString(),
  });

  const response = await fetch(`${API_BASE_URL}/measurements?${params}`);
  const data = await response.json();

  return processAirQualityData(data.results);
}

function processAirQualityData(rawData: any[]): AirQualityData[] {
  const groupedData = rawData.reduce((acc: { [key: string]: any }, measurement: any) => {
    const timestamp = measurement.date.utc;
    if (!acc[timestamp]) {
      acc[timestamp] = {
        timestamp,
        aqi: 0,
        co: 0,
        no: 0,
        no2: 0,
        o3: 0,
        so2: 0,
        pm25: 0,
        pm10: 0,
        nh3: 0,
      };
    }
    acc[timestamp][measurement.parameter.toLowerCase()] = measurement.value;
    return acc;
  }, {});

  return Object.values(groupedData);
}

// Simulated water quality data (as real-time API is not available)
export async function fetchWaterQualityData(startDate: Date, endDate: Date): Promise<WaterQualityData[]> {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    return {
      timestamp: date.toISOString(),
      ph: 7 + (Math.random() * 0.8 - 0.4),
      conductivity: 400 + (Math.random() * 100),
      turbidity: 3 + (Math.random() * 2),
    };
  });
}