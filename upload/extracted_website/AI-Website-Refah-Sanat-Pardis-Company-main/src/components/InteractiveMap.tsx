import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface InteractiveMapProps {
  lang: Language;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ lang }) => {
  const presence = translations[lang].presence;
  const map = translations[lang].map;
  const [activeHubIndex, setActiveHubIndex] = useState<number>(0);

  // Tehran is Hub 0. Connect Tehran to all other regional hubs, plus key cross-routes
  const hubs = presence.hubs;
  const tehranHub = hubs[0] || { coords: { x: 52, y: 38 } };

  const corridors = [
    // Primary trade routes from Tehran (0) to all destination countries
    ...hubs.slice(1).map((_, idx) => ({ from: 0, to: idx + 1 })),
    // Secondary regional trade links
    { from: 3, to: 2 }, // UAE <-> Oman
    { from: 1, to: 7 }, // India <-> Pakistan
    { from: 5, to: 10 }, // Turkey <-> Ukraine - Belarus
    { from: 9, to: 8 }, // Kazakhstan <-> Tajikistan
  ];

  return (
    <div className="w-full bg-[#071927] border border-white/10 relative overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Background subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #00C4CC 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-between">
        {/* Map Vector Stage */}
        <div className="w-full lg:w-2/3 aspect-[16/10] sm:aspect-[16/9] bg-[#04121E] border border-white/10 relative flex items-center justify-center overflow-hidden group rounded-sm">
          {/* World map subtle outline SVG */}
          <svg
            viewBox="0 0 100 60"
            className="w-full h-full object-contain p-2 sm:p-4 select-none"
          >
            <defs>
              <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00C4CC" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0B2A4A" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Faint continent representations */}
            {/* Europe & CIS */}
            <path
              d="M 22,18 Q 32,12 45,20 Q 38,32 25,28 Z"
              fill="#0B2A4A"
              opacity="0.35"
            />
            {/* Middle East & Central Asia */}
            <path
              d="M 38,26 Q 58,16 70,28 Q 62,42 42,38 Z"
              fill="#0B2A4A"
              opacity="0.45"
            />
            {/* South & East Asia */}
            <path
              d="M 62,28 Q 88,20 92,38 Q 78,50 64,42 Z"
              fill="#0B2A4A"
              opacity="0.35"
            />
            {/* Africa */}
            <path
              d="M 32,32 Q 44,30 48,46 Q 38,54 32,38 Z"
              fill="#0B2A4A"
              opacity="0.3"
            />

            {/* Vector Trade Corridor Connection Lines */}
            {corridors.map((corridor, idx) => {
              const h1 = hubs[corridor.from];
              const h2 = hubs[corridor.to];
              if (!h1 || !h2) return null;

              const isDirectlyActive =
                corridor.from === activeHubIndex || corridor.to === activeHubIndex;
              const isFromTehran = corridor.from === 0;

              return (
                <g key={idx}>
                  {/* Base corridor line */}
                  <line
                    x1={h1.coords.x}
                    y1={h1.coords.y}
                    x2={h2.coords.x}
                    y2={h2.coords.y}
                    stroke={isDirectlyActive ? '#00C4CC' : isFromTehran ? '#1A5380' : '#1E293B'}
                    strokeWidth={isDirectlyActive ? '0.7' : '0.35'}
                    strokeDasharray={isDirectlyActive ? 'none' : '0.8, 0.8'}
                    className="transition-all duration-300"
                  />

                  {/* Directional Light Pulse moving from Tehran outward */}
                  {isFromTehran && (
                    <circle r={isDirectlyActive ? '0.9' : '0.5'} fill="#00C4CC" opacity={isDirectlyActive ? 0.9 : 0.5}>
                      <animateMotion
                        path={`M ${h1.coords.x},${h1.coords.y} L ${h2.coords.x},${h2.coords.y}`}
                        dur={`${3 + (idx % 3)}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Hub Nodes & Country Markers */}
            {hubs.map((hub, idx) => {
              const isActive = activeHubIndex === idx;
              const isTehranHQ = idx === 0;

              // Smart label Y-offset positioning to prevent label overlap
              const labelBelow = ['UAE', 'امارات', 'Oman', 'عمان', 'Pakistan', 'پاکستان', 'India', 'هند'].includes(hub.shortName);
              const labelY = labelBelow ? hub.coords.y + 4.2 : hub.coords.y - (isTehranHQ ? 3.2 : 2.8);

              const labelText = hub.shortName || hub.name.split(' ')[0];

              return (
                <g
                  key={idx}
                  onClick={() => setActiveHubIndex(idx)}
                  onMouseEnter={() => setActiveHubIndex(idx)}
                  className="cursor-pointer group/node"
                >
                  {/* Radar pulse for active node */}
                  {isActive && (
                    <>
                      <circle
                        cx={hub.coords.x}
                        cy={hub.coords.y}
                        r="4.5"
                        fill="#00C4CC"
                        opacity="0.15"
                        className="animate-ping origin-center"
                      />
                      <circle
                        cx={hub.coords.x}
                        cy={hub.coords.y}
                        r="2.8"
                        fill="#00C4CC"
                        opacity="0.25"
                      />
                    </>
                  )}

                  {/* Tehran HQ Special Ring */}
                  {isTehranHQ && !isActive && (
                    <circle
                      cx={hub.coords.x}
                      cy={hub.coords.y}
                      r="2.5"
                      fill="none"
                      stroke="#00C4CC"
                      strokeWidth="0.4"
                      strokeDasharray="1 1"
                    />
                  )}

                  {/* Node core */}
                  <circle
                    cx={hub.coords.x}
                    cy={hub.coords.y}
                    r={isTehranHQ ? (isActive ? '2.2' : '1.6') : isActive ? '1.8' : '1.2'}
                    fill={isTehranHQ ? '#00C4CC' : isActive ? '#38BDF8' : '#6E9BAA'}
                    stroke="#04121E"
                    strokeWidth="0.5"
                    className="transition-all duration-200"
                  />

                  {/* Subtle Text Contrast Stroke/Backdrop */}
                  <text
                    x={hub.coords.x}
                    y={labelY}
                    textAnchor="middle"
                    fill="none"
                    stroke="#04121E"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                    fontSize={isTehranHQ ? '2.4' : '1.9'}
                    fontWeight={isActive || isTehranHQ ? 'bold' : 'normal'}
                    className="select-none tracking-tight pointer-events-none"
                  >
                    {labelText}
                  </text>

                  {/* Main Text Label */}
                  <text
                    x={hub.coords.x}
                    y={labelY}
                    textAnchor="middle"
                    fill={isActive ? '#FFFFFF' : isTehranHQ ? '#00C4CC' : '#6E9BAA'}
                    fontSize={isTehranHQ ? '2.4' : '1.9'}
                    fontWeight={isActive || isTehranHQ ? 'bold' : 'normal'}
                    className="select-none tracking-tight transition-all duration-200"
                  >
                    {labelText}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Footer Overlay Tag */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-[#04121E]/90 px-3 py-1.5 border border-white/10 backdrop-blur-sm">
            <span>{map.architecture}</span>
            <span className="text-[#00C4CC] font-semibold">
              {map.activeHub} {presence.hubs[activeHubIndex]?.name}
            </span>
          </div>
        </div>

        {/* Selected Hub Details & Selector Panel */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between space-y-5">
          <div className="bg-[#04121E] border border-white/10 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono tracking-[0.2em] text-[#00C4CC] uppercase">
                {map.strategicHub} {lang === 'fa' ? `${activeHubIndex + 1}`.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]) : `${activeHubIndex + 1 < 10 ? '0' : ''}${activeHubIndex + 1}`}
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase px-2 py-0.5 bg-white/5 border border-white/5">
                {presence.hubs[activeHubIndex]?.coords.x > 52 ? (lang === 'fa' ? 'شرق / جنوب شرقی' : 'East Sector') : (lang === 'fa' ? 'غرب / شمال غربی' : 'West Sector')}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-light text-white">
              {presence.hubs[activeHubIndex]?.name}
            </h3>
            <div className="text-xs font-mono text-slate-400">
              {map.regionLabel} <span className="text-slate-200">{presence.hubs[activeHubIndex]?.region}</span>
            </div>

            <div className="pt-2 border-t border-white/10 text-xs text-slate-300 font-light leading-relaxed">
              <span className="text-[#00C4CC] font-mono text-[10px] uppercase block mb-1">
                {map.commercialScope}
              </span>
              {presence.hubs[activeHubIndex]?.role}
            </div>
          </div>

          {/* Hub Selector Buttons List */}
          <div className="space-y-2 border-t border-white/10 pt-3">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>{map.selectCorridor}</span>
              <span className="text-[#00C4CC]">{presence.hubs.length} {lang === 'fa' ? 'کشور و هاب' : 'Hubs'}</span>
            </div>

            <div className="max-h-56 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
              {presence.hubs.map((hub, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHubIndex(idx)}
                  className={`w-full text-left rtl:text-right px-3 py-2 text-xs font-mono transition-all border ${
                    activeHubIndex === idx
                      ? 'bg-[#0B2A4A] border-[#00C4CC] text-white font-medium shadow-sm'
                      : 'bg-[#04121E]/60 border-white/5 text-slate-400 hover:text-slate-100 hover:border-slate-700'
                  } flex items-center justify-between group`}
                >
                  <span className="truncate max-w-[80%]">{hub.name}</span>
                  <span className={`text-[10px] font-mono ${activeHubIndex === idx ? 'text-[#00C4CC]' : 'text-slate-500'}`}>
                    {lang === 'fa' ? `${idx + 1}`.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]) : `${idx + 1 < 10 ? '0' : ''}${idx + 1}`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
