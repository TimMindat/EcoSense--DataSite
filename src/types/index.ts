export interface AirQualityData {
  timestamp: string;
  aqi: number;
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm25: number;
  pm10: number;
  nh3: number;
}

export interface WaterQualityData {
  timestamp: string;
  ph: number;
  conductivity: number;
  turbidity: number;
}

export interface DataPoint {
  name: string;
  value: number;
  unit: string;
}