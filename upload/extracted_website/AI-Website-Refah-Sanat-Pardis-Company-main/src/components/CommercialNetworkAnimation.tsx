import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Language } from '../types';

interface CommercialNetworkAnimationProps {
  lang: Language;
}

interface NodeData {
  id: string;
  enTitle: string;
  faTitle: string;
  enDesc: string;
  faDesc: string;
  // Normalized position percentages (0-100)
  x: number;         // Desktop (>= 1024px)
  y: number;
  tabletX: number;   // Tablet (640px - 1023px)
  tabletY: number;
  mobileX: number;   // Mobile (< 640px)
  mobileY: number;
  iconCode: string;
  connectedTo: string[];
}

export const CommercialNetworkAnimation: React.FC<CommercialNetworkAnimationProps> = ({ lang }) => {
  const isRtl = lang === 'fa';
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Nodes configuration
  const nodes: NodeData[] = useMemo(() => [
    {
      id: 'FINANCE',
      enTitle: 'FINANCE',
      faTitle: 'مالی',
      enDesc: 'Structured trade finance, Letters of Credit, payment terms & liquidity optimization.',
      faDesc: 'ساختاردهی مالی معاملات، اعتبار اسناد و مدیریت جریان نقدینگی.',
      x: 22,
      y: 20,
      tabletX: 25,
      tabletY: 18,
      mobileX: 16,
      mobileY: 12,
      iconCode: 'FIN',
      connectedTo: ['CENTER', 'RISK_MANAGEMENT', 'TRUSTED_PARTNERS'],
    },
    {
      id: 'RISK_MANAGEMENT',
      enTitle: 'RISK MANAGEMENT',
      faTitle: 'مدیریت ریسک',
      enDesc: 'Identification & control of financial, contractual, market & operational risks.',
      faDesc: 'شناسایی و کنترل ریسک‌های مالی، تجاری، بازار و قراردادی.',
      x: 78,
      y: 20,
      tabletX: 75,
      tabletY: 18,
      mobileX: 84,
      mobileY: 12,
      iconCode: 'RSK',
      connectedTo: ['CENTER', 'FINANCE', 'COMMERCIAL_MANAGEMENT'],
    },
    {
      id: 'COMMERCIAL_MANAGEMENT',
      enTitle: 'COMMERCIAL MANAGEMENT',
      faTitle: 'مدیریت تجاری',
      enDesc: 'End-to-end deal structuring, trade negotiation & contract execution.',
      faDesc: 'مدیریت جامع فرآیند تجارت، مذاکرات و اجرای دقیق قراردادها.',
      x: 82,
      y: 58,
      tabletX: 78,
      tabletY: 50,
      mobileX: 86,
      mobileY: 50,
      iconCode: 'MGT',
      connectedTo: ['CENTER', 'RISK_MANAGEMENT', 'IMPORT', 'EXPORT', 'TRUSTED_PARTNERS'],
    },
    {
      id: 'IMPORT',
      enTitle: 'IMPORT',
      faTitle: 'واردات',
      enDesc: 'Sourcing essential commodities, industrial raw materials & machinery.',
      faDesc: 'تأمین و واردات کالاهای اساسی، مواد اولیه و تجهیزات صنعتی.',
      x: 64,
      y: 84,
      tabletX: 68,
      tabletY: 82,
      mobileX: 82,
      mobileY: 88,
      iconCode: 'IMP',
      connectedTo: ['CENTER', 'COMMERCIAL_MANAGEMENT', 'EXPORT'],
    },
    {
      id: 'EXPORT',
      enTitle: 'EXPORT',
      faTitle: 'صادرات',
      enDesc: 'Global distribution of energy, agricultural & industrial commodities.',
      faDesc: 'صادرات و عرضه فرامرزی محصولات صنعتی، کشاورزی و انرژی.',
      x: 36,
      y: 84,
      tabletX: 32,
      tabletY: 82,
      mobileX: 18,
      mobileY: 88,
      iconCode: 'EXP',
      connectedTo: ['CENTER', 'COMMERCIAL_MANAGEMENT', 'IMPORT'],
    },
    {
      id: 'TRUSTED_PARTNERS',
      enTitle: 'TRUSTED PARTNERS',
      faTitle: 'شرکای تجاری قابل اعتماد',
      enDesc: 'Building long-term, transparent B2B trade relationships across global markets.',
      faDesc: 'ایجاد روابط پایدار، شفاف و بلندمدت با فعالان معتبر تجاری.',
      x: 18,
      y: 58,
      tabletX: 22,
      tabletY: 50,
      mobileX: 14,
      mobileY: 50,
      iconCode: 'PTR',
      connectedTo: ['CENTER', 'COMMERCIAL_MANAGEMENT', 'FINANCE'],
    },
  ], []);

  // Inter-node connections list (unique pairs)
  const connections = useMemo(() => {
    const pairs: { from: string; to: string; type: 'primary' | 'secondary' }[] = [];
    
    // Central hub connections
    nodes.forEach((node) => {
      pairs.push({ from: 'CENTER', to: node.id, type: 'primary' });
    });

    // Secondary links
    const secondaryPairs = [
      ['FINANCE', 'RISK_MANAGEMENT'],
      ['IMPORT', 'COMMERCIAL_MANAGEMENT'],
      ['EXPORT', 'COMMERCIAL_MANAGEMENT'],
      ['IMPORT', 'EXPORT'],
      ['COMMERCIAL_MANAGEMENT', 'TRUSTED_PARTNERS'],
    ];

    secondaryPairs.forEach(([from, to]) => {
      pairs.push({ from, to, type: 'secondary' });
    });

    return pairs;
  }, [nodes]);

  // Handle Reduced Motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Resize observer for responsive canvas
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.floor(rect.width),
          height: Math.floor(rect.height),
        });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Animation Loop on Canvas for Particles & Glowing Connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();

    // Generate traveling particle data
    const particles = connections.map((conn) => {
      return Array.from({ length: conn.type === 'primary' ? 3 : 2 }, (_, i) => ({
        progress: (i * 0.33 + Math.random() * 0.1) % 1,
        speed: 0.0018 + Math.random() * 0.0012,
        size: conn.type === 'primary' ? 2.5 : 1.8,
      }));
    });

    const isMobile = dimensions.width < 640;
    const isTablet = dimensions.width >= 640 && dimensions.width < 1024;

    const getNodePos = (nodeId: string) => {
      if (nodeId === 'CENTER') {
        return { x: dimensions.width * 0.5, y: dimensions.height * 0.5 };
      }
      const target = nodes.find((n) => n.id === nodeId);
      if (!target) return { x: dimensions.width * 0.5, y: dimensions.height * 0.5 };
      
      let xPct = target.x;
      let yPct = target.y;

      if (isMobile) {
        xPct = target.mobileX;
        yPct = target.mobileY;
      } else if (isTablet) {
        xPct = target.tabletX;
        yPct = target.tabletY;
      }

      return {
        x: (xPct / 100) * dimensions.width,
        y: (yPct / 100) * dimensions.height,
      };
    };

    const render = (time: number) => {
      const elapsed = time - startTime;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 1. Draw glowing background central pulse rings
      const centerPos = getNodePos('CENTER');
      const pulseTime = (elapsed * 0.001) % 4; // 4 second cycle
      const maxRingRadius = isMobile ? 70 : isTablet ? 95 : 120;
      const minRingRadius = isMobile ? 22 : isTablet ? 30 : 40;

      for (let r = 1; r <= 3; r++) {
        const ringProgress = (pulseTime / 4 + r * 0.3) % 1;
        const radius = minRingRadius + ringProgress * maxRingRadius;
        const opacity = (1 - ringProgress) * 0.25;

        ctx.beginPath();
        ctx.arc(centerPos.x, centerPos.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 196, 204, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Helper to check if node or connection is highlighted
      const isConnectionHighlighted = (conn: { from: string; to: string }) => {
        if (!activeNodeId) return false;
        if (activeNodeId === 'CENTER') return true;
        return conn.from === activeNodeId || conn.to === activeNodeId;
      };

      // 2. Draw Connection Lines
      connections.forEach((conn, connIdx) => {
        const p1 = getNodePos(conn.from);
        const p2 = getNodePos(conn.to);
        const highlighted = isConnectionHighlighted(conn);

        let strokeOpacity = conn.type === 'primary' ? 0.25 : 0.15;
        let strokeWidth = conn.type === 'primary' ? (isMobile ? 1.2 : 1.5) : (isMobile ? 0.8 : 1.0);
        let strokeColor = '#00C4CC';

        if (activeNodeId) {
          if (highlighted) {
            strokeOpacity = 0.9;
            strokeWidth = isMobile ? 2.0 : 2.5;
            strokeColor = '#00C4CC';
          } else {
            strokeOpacity = 0.08;
          }
        }

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = strokeOpacity;
        ctx.lineWidth = strokeWidth;

        if (conn.type === 'secondary' && !highlighted) {
          ctx.setLineDash([4, 4]);
        }

        ctx.stroke();
        ctx.restore();

        // 3. Draw Traveling Flow Particles along lines
        if (!prefersReducedMotion) {
          const particleList = particles[connIdx];
          particleList.forEach((pt) => {
            pt.progress = (pt.progress + pt.speed) % 1;

            // Import travels inwards, Export travels outwards, others move forward
            let currentProg = pt.progress;
            if (conn.to === 'IMPORT' || conn.from === 'IMPORT') {
              // Flow towards center
              currentProg = conn.from === 'CENTER' ? 1 - pt.progress : pt.progress;
            } else if (conn.to === 'EXPORT' || conn.from === 'EXPORT') {
              // Flow outwards from center
              currentProg = conn.from === 'CENTER' ? pt.progress : 1 - pt.progress;
            }

            const curX = p1.x + (p2.x - p1.x) * currentProg;
            const curY = p1.y + (p2.y - p1.y) * currentProg;

            const particleOpacity = activeNodeId
              ? highlighted
                ? 1.0
                : 0.15
              : 0.7;

            ctx.beginPath();
            ctx.arc(curX, curY, isMobile ? pt.size * 0.8 : pt.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00C4CC';
            ctx.globalAlpha = particleOpacity;
            ctx.shadowColor = '#00C4CC';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset
          });
        }
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, connections, nodes, activeNodeId, prefersReducedMotion]);

  // Determine if node is connected to active hovered node
  const isNodeActiveOrConnected = (nodeId: string) => {
    if (!activeNodeId) return true;
    if (activeNodeId === nodeId) return true;
    if (activeNodeId === 'CENTER') return true;

    if (nodeId === 'CENTER') {
      return true;
    }

    const activeNode = nodes.find((n) => n.id === activeNodeId);
    if (!activeNode) return false;

    return (
      activeNode.connectedTo.includes(nodeId) ||
      nodes.find((n) => n.id === nodeId)?.connectedTo.includes(activeNodeId)
    );
  };

  const isMobile = dimensions.width < 640;
  const isTablet = dimensions.width >= 640 && dimensions.width < 1024;

  const activeNodeObj = useMemo(() => {
    if (!activeNodeId || activeNodeId === 'CENTER') return null;
    return nodes.find((n) => n.id === activeNodeId) || null;
  }, [activeNodeId, nodes]);

  // Smart overlay placement logic:
  // If active node is near the bottom of stage (e.g. IMPORT, EXPORT), place overlay at the TOP
  // Otherwise place overlay at the BOTTOM
  const isBottomNode = useMemo(() => {
    if (!activeNodeObj) return false;
    if (activeNodeObj.id === 'IMPORT' || activeNodeObj.id === 'EXPORT') return true;
    let yVal = activeNodeObj.y;
    if (isMobile) yVal = activeNodeObj.mobileY;
    else if (isTablet) yVal = activeNodeObj.tabletY;
    return yVal >= 65;
  }, [activeNodeObj, isMobile, isTablet]);

  return (
    <div className="w-full bg-[#04121E] border border-white/10 relative overflow-hidden p-3 xs:p-4 sm:p-6 md:p-8 select-none">
      {/* Background Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #00C4CC 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Header Eyebrow */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00C4CC] uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#00C4CC] animate-pulse shrink-0" />
          <span>{isRtl ? 'اکوسیستم یکپارچه تجاری' : 'Integrated Commercial Network'}</span>
        </div>
        <div className="text-[11px] font-mono text-slate-400">
          {isRtl ? 'برای مشاهده جزئیات روی هر بخش کلیک کنید یا ماوس را نگه دارید' : 'Click or hover over nodes to explore capabilities'}
        </div>
      </div>

      {/* Animation Stage */}
      <div
        ref={containerRef}
        onClick={() => setActiveNodeId(null)}
        className="relative w-full aspect-[4/3] xs:aspect-[14/10] sm:aspect-[16/10] lg:aspect-[16/9] min-h-[380px] sm:min-h-[420px] max-h-[540px] bg-[#071927]/80 border border-white/10 overflow-hidden rounded-sm flex items-center justify-center cursor-default"
      >
        {/* Canvas Layer for Lines and Flow Particles */}
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* CENTER HUB NODE */}
        <div
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          onMouseEnter={() => setActiveNodeId('CENTER')}
          onMouseLeave={() => setActiveNodeId(null)}
          onClick={(e) => {
            e.stopPropagation();
            setActiveNodeId(activeNodeId === 'CENTER' ? null : 'CENTER');
          }}
          className="absolute z-20 cursor-pointer group flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
        >
          <div className="relative p-2.5 xs:p-3 sm:p-5 md:p-6 bg-[#0B2A4A]/90 backdrop-blur-md border border-[#00C4CC] shadow-[0_0_25px_rgba(0,196,204,0.3)] rounded-full flex flex-col items-center justify-center w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 group-hover:border-white transition-all">
            <div className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-white tracking-wider sm:tracking-widest leading-tight uppercase font-mono px-1">
              {isRtl ? 'رفاه صنعت پردیس' : 'REFAH SANAT PARDIS'}
            </div>
            <div className="h-px w-6 sm:w-8 bg-[#00C4CC] my-0.5 sm:my-1.5" />
            <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-[#00C4CC] tracking-wider uppercase">
              {isRtl ? 'شرکت بازرگانی' : 'TRADING CO.'}
            </div>
          </div>
        </div>

        {/* 6 OUTER NODES */}
        {nodes.map((node) => {
          let xPct = node.x;
          let yPct = node.y;
          if (isMobile) {
            xPct = node.mobileX;
            yPct = node.mobileY;
          } else if (isTablet) {
            xPct = node.tabletX;
            yPct = node.tabletY;
          }

          const isHighlighted = activeNodeId === node.id;
          const isDimmed = activeNodeId && !isNodeActiveOrConnected(node.id);

          return (
            <div
              key={node.id}
              style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setActiveNodeId(node.id)}
              onMouseLeave={() => setActiveNodeId(null)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveNodeId(activeNodeId === node.id ? null : node.id);
              }}
              className={`absolute z-20 cursor-pointer transition-all duration-300 max-w-[92px] xs:max-w-[110px] sm:max-w-[150px] md:max-w-[165px] lg:max-w-none ${
                isDimmed ? 'opacity-30 scale-95' : 'opacity-100'
              }`}
            >
              <div
                className={`relative px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-3 sm:py-2 md:px-3.5 md:py-2 bg-[#04121E]/90 backdrop-blur-sm border transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 xs:gap-2.5 sm:gap-3 rounded-sm ${
                  isHighlighted
                    ? 'border-[#00C4CC] bg-[#0B2A4A] shadow-[0_0_20px_rgba(0,196,204,0.4)] scale-105 sm:scale-110'
                    : 'border-white/20 hover:border-[#00C4CC]/70 hover:bg-[#071927]'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 transition-colors ${
                    isHighlighted ? 'bg-[#00C4CC] animate-ping' : 'bg-[#00C4CC]/60'
                  }`}
                />
                <div className="flex flex-col text-center sm:text-left sm:rtl:text-right">
                  <span
                    className={`text-[10px] xs:text-xs sm:text-xs md:text-sm font-medium tracking-wide leading-tight transition-colors break-words ${
                      isHighlighted ? 'text-[#00C4CC]' : 'text-white'
                    }`}
                  >
                    {isRtl ? node.faTitle : node.enTitle}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* ACTIVE NODE DETAILS OVERLAY / TOOLTIP BADGE */}
        {activeNodeObj && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute ${
              isBottomNode
                ? 'top-2 left-2 right-2 sm:top-4 sm:right-4 sm:left-auto'
                : 'bottom-2 left-2 right-2 sm:bottom-4 sm:right-4 sm:left-auto'
            } z-30 max-w-full sm:max-w-xs md:max-w-sm bg-[#04121E]/95 border border-[#00C4CC]/50 backdrop-blur-md p-3 sm:p-4 shadow-2xl text-left rtl:text-right rounded-sm animate-fadeIn pointer-events-auto`}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 sm:pb-2 mb-2">
              <span className="text-[10px] font-mono text-[#00C4CC] uppercase tracking-wider">
                {activeNodeObj.iconCode} // {isRtl ? 'حوزه تجاری' : 'Commercial Pillar'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveNodeId(null);
                }}
                className="text-slate-400 hover:text-white text-sm font-mono px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
              >
                ×
              </button>
            </div>
            <h4 className="text-xs sm:text-sm font-medium text-white mb-1">
              {isRtl ? activeNodeObj.faTitle : activeNodeObj.enTitle}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-300 font-light leading-relaxed">
              {isRtl ? activeNodeObj.faDesc : activeNodeObj.enDesc}
            </p>
          </div>
        )}
      </div>

      {/* FOOTER SUMMARY STATEMENT */}
      <div className="relative z-10 mt-4 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 font-light gap-2">
        <p className="text-center md:text-left rtl:md:text-right text-slate-300">
          {isRtl
            ? 'یکپارچه‌سازی هوشمندانه ساختارهای مالی، مدیریت ریسک، واردات، صادرات و شبکه شرکای تجاری.'
            : 'Connecting financial insight, risk controls, commercial management, import, export, and trusted partnerships into an integrated approach to trade.'}
        </p>
        <span className="text-[10px] font-mono text-[#00C4CC] uppercase tracking-widest whitespace-nowrap">
          REFAH SANAT PARDIS ECOSYSTEM
        </span>
      </div>
    </div>
  );
};
