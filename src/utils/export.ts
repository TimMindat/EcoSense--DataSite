import { unparse } from 'papaparse';
import { AirQualityData, WaterQualityData } from '../types';
import { format } from 'date-fns';

export function exportToCSV(
  data: AirQualityData[] | WaterQualityData[], 
  type: 'air' | 'water',
  startDate: Date,
  endDate: Date
) {
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(endDate, 'yyyy-MM-dd');
  const filename = `${type}-quality-data-${formattedStartDate}-to-${formattedEndDate}.csv`;
  
  const fields = type === 'air' 
    ? ['timestamp', 'aqi', 'co', 'no', 'no2', 'o3', 'so2', 'pm25', 'pm10', 'nh3']
    : ['timestamp', 'ph', 'conductivity', 'turbidity'];
  
  const csv = unparse({
    fields,
    data: data.map(row => ({
      ...row,
      timestamp: format(new Date(row.timestamp), 'yyyy-MM-dd HH:mm:ss')
    }))
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