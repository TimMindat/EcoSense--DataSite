import { AirQualityData, WaterQualityData } from '../types';

const WAQI_TOKEN = 'demo'; // Replace with your token in production
const WAQI_BASE_URL = 'https://api.waqi.info/feed';

export async function fetchAirQualityData(startDate: Date, endDate: Date): Promise<AirQualityData[]> {
  try {
    const response = await fetch(`${WAQI_BASE_URL}/cairo/?token=${WAQI_TOKEN}`);
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('Failed to fetch air quality data');
    }

    // Generate historical data based on current values
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      const baseAqi = data.data.aqi || 80;
      const variation = Math.random() * 20 - 10;

      return {
        timestamp: date.toISOString(),
        aqi: Math.max(0, baseAqi + variation),
        co: Math.max(0, 1.2 + Math.random()),
        no: Math.max(0, 0.5 + Math.random() * 0.3),
        no2: Math.max(0, 0.8 + Math.random() * 0.4),
        o3: Math.max(0, 0.4 + Math.random() * 0.2),
        so2: Math.max(0, 0.3 + Math.random() * 0.2),
        pm25: Math.max(0, (data.data.iaqi.pm25?.v || 25) + Math.random() * 10),
        pm10: Math.max(0, (data.data.iaqi.pm10?.v || 45) + Math.random() * 15),
        nh3: Math.max(0, 0.2 + Math.random() * 0.1),
      };
    });
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return [];
  }
}

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