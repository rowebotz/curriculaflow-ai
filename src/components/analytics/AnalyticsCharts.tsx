import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell
} from 'recharts';
import { Star, AlertTriangle, CheckCircle2 } from 'lucide-react';
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
          tick={{ fill: '#000000', fontWeight: 'bold', fontSize: 10 }}
        />
        <YAxis
          axisLine={{ stroke: '#000000', strokeWidth: 2 }}
          tick={{ fill: '#000000', fontWeight: 'bold', fontSize: 10 }}
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
  const getPattern = (value: number) => {
    if (value > 85) return "solid";
    if (value > 70) return "url(#pattern-dots)";
    return "url(#pattern-stripes)";
  };
  const getIcon = (value: number) => {
    if (value > 85) return <Star className="w-3 h-3 text-brand-primary" />;
    if (value > 70) return <CheckCircle2 className="w-3 h-3 text-brand-black" />;
    return <AlertTriangle className="w-3 h-3 text-brand-gray" />;
  };
  return (
    <div className="w-full h-full relative font-sans">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" barSize={32} margin={{ left: 20, right: 40 }}>
          <defs>
            <pattern id="pattern-stripes" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#71717A" strokeWidth="2" />
            </pattern>
            <pattern id="pattern-dots" patternUnits="userSpaceOnUse" width="10" height="10">
              <circle cx="2" cy="2" r="1.5" fill="#000000" />
            </pattern>
          </defs>
          <CartesianGrid strokeDasharray="0" horizontal={false} stroke="#00000010" />
          <XAxis
            type="number"
            domain={[0, 100]}
            axisLine={{ stroke: '#000000', strokeWidth: 2 }}
            tick={{ fill: '#000000', fontWeight: 'bold', fontSize: 10 }}
          />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={{ stroke: '#000000', strokeWidth: 2 }}
            tick={{ fill: '#000000', fontWeight: 'bold', fontSize: 10 }}
            width={90}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#00000005' }} />
          <Bar dataKey="value" radius={[0, 0, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.value > 85 ? '#E21A23' : getPattern(entry.value)}
                stroke="#000000"
                strokeWidth={1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {/* Icon layer for accessibility */}
      <div className="absolute top-0 right-0 h-full flex flex-col justify-around py-4 pointer-events-none">
        {data.map((entry, idx) => (
          <div key={idx} className="flex items-center pr-2">
            {getIcon(entry.value)}
          </div>
        ))}
      </div>
    </div>
  );
};