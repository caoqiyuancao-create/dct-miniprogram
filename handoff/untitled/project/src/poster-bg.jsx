// Poster-derived background: paper-blue sky + radial light rays + star specks
// Mirrors the second-issue poster's visual DNA.

function PosterSky({ children, rays = true, stars = true, tone = 'light', style = {} }) {
  // tone: 'light' (landing hero) | 'soft' (form bg) | 'deep' (detail hero)
  const bg = {
    light: 'linear-gradient(180deg, #eef4fb 0%, #d3e3f5 45%, #b7cfea 100%)',
    soft:  'linear-gradient(180deg, #f3f6fb 0%, #e4edf7 100%)',
    deep:  'linear-gradient(180deg, #c2d6ee 0%, #8fb1d6 55%, #6a93c1 100%)',
  }[tone];

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: bg, ...style }}>
      {/* subtle paper texture via repeating thin lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.25) 0 1px, transparent 1px 3px),' +
          'repeating-linear-gradient(90deg, rgba(20,40,80,0.03) 0 1px, transparent 1px 2px)',
        mixBlendMode: 'overlay', opacity: 0.6, pointerEvents: 'none',
      }} />
      {rays && <RadialRays />}
      {stars && <StarSpecks />}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}

function RadialRays() {
  // Rays emanate from lower-left like the poster — runner's forward beams.
  const origin = { x: '14%', y: '112%' };
  const rays = [
    { deg: -62, len: 170, w: 42, op: 0.22 },
    { deg: -55, len: 160, w: 28, op: 0.17 },
    { deg: -48, len: 175, w: 50, op: 0.26 },
    { deg: -40, len: 165, w: 32, op: 0.16 },
    { deg: -33, len: 170, w: 60, op: 0.24 },
    { deg: -25, len: 160, w: 28, op: 0.14 },
    { deg: -18, len: 150, w: 44, op: 0.20 },
    { deg: -10, len: 140, w: 26, op: 0.12 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {rays.map((r, i) => (
        <div key={i} style={{
          position: 'absolute', left: origin.x, top: origin.y,
          width: r.len + '%', height: r.w + 'px',
          transformOrigin: '0% 50%',
          transform: `rotate(${r.deg}deg)`,
          background: `linear-gradient(90deg, rgba(255,255,255,${r.op}) 0%, rgba(255,255,255,${r.op * 0.6}) 50%, rgba(255,255,255,0) 100%)`,
          filter: 'blur(6px)',
        }} />
      ))}
    </div>
  );
}

function StarSpecks() {
  // Four-point stars scattered along the rays.
  const stars = [
    { x: 78, y: 18, s: 18, o: 0.9 },
    { x: 62, y: 44, s: 13, o: 0.75 },
    { x: 86, y: 54, s: 10, o: 0.65 },
    { x: 48, y: 66, s: 16, o: 0.85 },
    { x: 72, y: 78, s: 11, o: 0.7 },
    { x: 34, y: 30, s: 9,  o: 0.55 },
    { x: 92, y: 32, s: 8,  o: 0.5 },
    { x: 22, y: 72, s: 12, o: 0.7 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {stars.map((s, i) => <Star4 key={i} {...s} />)}
    </div>
  );
}

function Star4({ x, y, s, o }) {
  return (
    <svg
      width={s * 2} height={s * 2} viewBox="-10 -10 20 20"
      style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, opacity: o, transform: 'translate(-50%,-50%)' }}
    >
      <defs>
        <radialGradient id={`sg-${x}-${y}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff6d0" stopOpacity="1"/>
          <stop offset="40%" stopColor="#ffe49a" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#ffd06a" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle r="5" fill={`url(#sg-${x}-${y})`} />
      <path d="M0,-9 L1.5,-1.5 L9,0 L1.5,1.5 L0,9 L-1.5,1.5 L-9,0 L-1.5,-1.5 Z" fill="#ffe7a5" opacity="0.95"/>
      <path d="M0,-9 L0.6,-0.6 L9,0 L0.6,0.6 L0,9 L-0.6,0.6 L-9,0 L-0.6,-0.6 Z" fill="#fff" opacity="0.9"/>
    </svg>
  );
}

// Six-pointed star used as bullet / accent
function StarBullet({ size = 10, color = '#c9a24a' }) {
  return (
    <svg width={size} height={size} viewBox="-10 -10 20 20" style={{ flexShrink: 0 }}>
      <path d="M0,-9 L1.5,-1.5 L9,0 L1.5,1.5 L0,9 L-1.5,1.5 L-9,0 L-1.5,-1.5 Z" fill={color}/>
    </svg>
  );
}

Object.assign(window, { PosterSky, Star4, StarBullet });
