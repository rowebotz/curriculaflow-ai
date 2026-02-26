import React, { useId } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell, LabelList
} from 'recharts';
import { Star, AlertTriangle, CheckCircle2 } from 'lucide-react';
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-black text-white p-3 shadow-sketch-hover border border-white/10 font-bold text-[10px] uppercase tracking-widest">
        <p className="border-b border-white/20 mb-2 pb-1 font-display">{label}</p>
        <p className="text-brand-primary">Performance: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};
export const EngagementTrends = ({ data }: { data: any[] }) => {
  const gradientId = useId();
  const summary = data.map(d => `${d.name}: ${d.value}%`).join(', ');
  return (
    <div className="w-full h-full relative" role="img" aria-label={`Engagement Trends chart showing student activity across the week. Data points: ${summary}`}>
      <span className="sr-only">Chart data: {summary}</span>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E21A23" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#E21A23" stopOpacity={0}/>
            </linearGradient>
          </defs>
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
            fill={`url(#${gradientId})`}
            role="presentation"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
const CustomMasteryLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const iconX = x + width + 10;
  const iconY = y + height / 2 - 8;
  if (value > 85) {
    return (
      <foreignObject x={iconX} y={iconY} width="16" height="16">
        <Star className="w-4 h-4 text-brand-primary" aria-label="Mastery Achieved" />
      </foreignObject>
    );
  }
  if (value > 70) {
    return (
      <foreignObject x={iconX} y={iconY} width="16" height="16">
        <CheckCircle2 className="w-4 h-4 text-brand-black" aria-label="On Track" />
      </foreignObject>
    );
  }
  return (
    <foreignObject x={iconX} y={iconY} width="16" height="16">
      <AlertTriangle className="w-4 h-4 text-brand-gray" aria-label="Intervention Suggested" />
    </foreignObject>
  );
};
export const MasteryHeatmap = ({ data }: { data: any[] }) => {
  const idPrefix = useId().replace(/:/g, '');
  const stripeId = `pattern-stripes-${idPrefix}`;
  const dotId = `pattern-dots-${idPrefix}`;
  const summary = data.map(d => `${d.name}: ${d.value}% mastery`).join('. ');
  const getPattern = (value: number) => {
    if (value > 85) return "solid";
    if (value > 70) return `url(#${dotId})`;
    return `url(#${stripeId})`;
  };
  return (
    <div className="w-full h-full relative font-sans" role="img" aria-label={`Standards Mastery Heatmap. ${summary}`}>
      <span className="sr-only">Mastery levels by standard: {summary}</span>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          barSize={32}
          margin={{ left: 20, right: 40 }}
        >
          <defs>
            <pattern id={stripeId} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#71717A" strokeWidth="2" />
            </pattern>
            <pattern id={dotId} patternUnits="userSpaceOnUse" width="10" height="10">
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
                strokeWidth={1.5}
                aria-label={`${entry.name}: ${entry.value}% mastery`}
              />
            ))}
            <LabelList dataKey="value" content={<CustomMasteryLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};