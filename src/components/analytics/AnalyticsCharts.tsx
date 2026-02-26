import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, Cell
} from 'recharts';
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-black text-white p-3 shadow-none border-none font-bold text-[10px] uppercase tracking-widest">
        <p className="border-b border-white/20 mb-2 pb-1">{label}</p>
        <p className="text-brand-primary">Performance: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};
export const EngagementTrends = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="0" stroke="#00000010" vertical={false} />
        <XAxis
          dataKey="name"
          axisLine={{ stroke: '#000000', strokeWidth: 2 }}
          tick={{ fill: '#000000', fontWeight: 'black', fontSize: 10 }}
        />
        <YAxis
          axisLine={{ stroke: '#000000', strokeWidth: 2 }}
          tick={{ fill: '#000000', fontWeight: 'black', fontSize: 10 }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E21A23', strokeWidth: 2 }} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#E21A23"
          strokeWidth={3}
          fill="#E21A23"
          fillOpacity={0.1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export const MasteryHeatmap = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" barSize={20}>
        <CartesianGrid strokeDasharray="0" horizontal={false} stroke="#00000010" />
        <XAxis
          type="number"
          domain={[0, 100]}
          axisLine={{ stroke: '#000000', strokeWidth: 2 }}
          tick={{ fill: '#000000', fontWeight: 'black', fontSize: 10 }}
        />
        <YAxis
          dataKey="name"
          type="category"
          axisLine={{ stroke: '#000000', strokeWidth: 2 }}
          tick={{ fill: '#000000', fontWeight: 'black', fontSize: 10 }}
          width={80}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#00000005' }} />
        <Bar dataKey="value" radius={[0, 2, 2, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.value > 85 ? '#E21A23' : entry.value > 70 ? '#000000' : '#71717A'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};