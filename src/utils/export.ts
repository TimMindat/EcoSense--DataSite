import { parse } from 'papaparse';
import { AirQualityData, WaterQualityData } from '../types';
import { format } from 'date-fns';

export function exportToCSV(data: AirQualityData[] | WaterQualityData[], type: 'air' | 'water') {
  const filename = `${type}-quality-data-${format(new Date(), 'yyyy-MM-dd')}.csv`;
  
  const fields = type === 'air' 
    ? ['timestamp', 'aqi', 'co', 'no', 'no2', 'o3', 'so2', 'pm25', 'pm10', 'nh3']
    : ['timestamp', 'ph', 'conductivity', 'turbidity'];
  
  const csv = parse(data, {
    fields,
    delimiter: ',',
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
    return;
  }
  
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}