import { AirQualityData, WaterQualityData } from '../types';

export const mockAirData: AirQualityData[] = [
  {
    timestamp: '2024-03-10T12:00:00',
    aqi: 85,
    co: 1.2,
    no: 0.5,
    no2: 0.8,
    o3: 0.4,
    so2: 0.3,
    pm25: 25,
    pm10: 45,
    nh3: 0.2
  },
  // Add more mock data points as needed
];

export const mockWaterData: WaterQualityData[] = [
  {
    timestamp: '2024-03-10T12:00:00',
    ph: 7.2,
    conductivity: 450,
    turbidity: 3.5
  },
  // Add more mock data points as needed
];

// In a real application, this would be replaced with actual API calls