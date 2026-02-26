import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, Cell
} from 'recharts';
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-2 border-ink p-2 shadow-sketch font-bold text-xs">
        <p className="border-b border-ink/20 mb-1">{label}</p>
        <p className="text-ink">Score: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};
export const EngagementTrends = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
            <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" 
                  stroke="#FFD23F" strokeWidth="1" />
          </pattern>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#3B3B3B20" vertical={false} />
        <XAxis 
          dataKey="name" 
          axisLine={{ stroke: '#3B3B3B', strokeWidth: 2 }}
          tick={{ fill: '#3B3B3B', fontWeight: 'bold' }}
        />
        <YAxis 
          axisLine={{ stroke: '#3B3B3B', strokeWidth: 2 }}
          tick={{ fill: '#3B3B3B', fontWeight: 'bold' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="stepAfter" 
          dataKey="value" 
          stroke="#3B3B3B" 
          strokeWidth={3} 
          fill="url(#diagonalHatch)" 
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export const MasteryHeatmap = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#3B3B3B10" />
        <XAxis 
          type="number" 
          domain={[0, 100]} 
          axisLine={{ stroke: '#3B3B3B', strokeWidth: 2 }}
          tick={{ fill: '#3B3B3B', fontWeight: 'bold' }}
        />
        <YAxis 
          dataKey="name" 
          type="category" 
          axisLine={{ stroke: '#3B3B3B', strokeWidth: 2 }}
          tick={{ fill: '#3B3B3B', fontWeight: 'bold' }}
          width={100}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" stroke="#3B3B3B" strokeWidth={2}>
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.value > 85 ? '#FFD23F' : entry.value > 70 ? '#3B3B3B20' : '#EE4266'} 
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};