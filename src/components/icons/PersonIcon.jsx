/* Vivid person: cyan hair, hot-pink outfit, cream face */
export default function PersonIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      {/* hair */}
      <rect x="4" y="1" width="8" height="1" fill="#a5e0ff"/>
      <rect x="3" y="2" width="2" height="2" fill="#a5e0ff"/>
      <rect x="11" y="2" width="2" height="2" fill="#a5e0ff"/>
      <rect x="3" y="4" width="10" height="1" fill="#a5e0ff"/>
      {/* face */}
      <rect x="4" y="2" width="8" height="4" fill="#fffcee"/>
      <rect x="3" y="3" width="1" height="2" fill="#fffcee"/>
      <rect x="12" y="3" width="1" height="2" fill="#fffcee"/>
      {/* face outline */}
      <rect x="4" y="2" width="8" height="1" fill="#2a0160"/>
      <rect x="4" y="6" width="8" height="1" fill="#2a0160"/>
      <rect x="3" y="3" width="1" height="3" fill="#2a0160"/>
      <rect x="12" y="3" width="1" height="3" fill="#2a0160"/>
      {/* eyes */}
      <rect x="5" y="4" width="2" height="1" fill="#2a0160"/>
      <rect x="9" y="4" width="2" height="1" fill="#2a0160"/>
      {/* eye shine */}
      <rect x="6" y="4" width="1" height="1" fill="#fff"/>
      <rect x="10" y="4" width="1" height="1" fill="#fff"/>
      {/* blush */}
      <rect x="4"  y="5" width="1" height="1" fill="#ff5bec"/>
      <rect x="11" y="5" width="1" height="1" fill="#ff5bec"/>
      {/* mouth */}
      <rect x="6" y="5" width="4" height="1" fill="#2a0160"/>
      {/* neck */}
      <rect x="7" y="7" width="2" height="1" fill="#fffcee"/>
      <rect x="7" y="7" width="2" height="1" fill="#2a0160" opacity="0.3"/>
      {/* body */}
      <rect x="3" y="8"  width="10" height="6" fill="#f891e9"/>
      {/* collar */}
      <rect x="6" y="8" width="4" height="1" fill="#ff5bec"/>
      <rect x="7" y="9" width="2" height="1" fill="#ff5bec"/>
      {/* body outline */}
      <rect x="2"  y="8"  width="1" height="6" fill="#2a0160"/>
      <rect x="13" y="8"  width="1" height="6" fill="#2a0160"/>
      <rect x="3"  y="14" width="10" height="1" fill="#2a0160"/>
      <rect x="3"  y="8"  width="10" height="1" fill="#2a0160"/>
      {/* arms */}
      <rect x="2"  y="9" width="2" height="4" fill="#f891e9"/>
      <rect x="12" y="9" width="2" height="4" fill="#f891e9"/>
      {/* sleeves */}
      <rect x="2"  y="9" width="2" height="1" fill="#ff5bec"/>
      <rect x="12" y="9" width="2" height="1" fill="#ff5bec"/>
      {/* hands */}
      <rect x="2"  y="12" width="2" height="1" fill="#fffcee"/>
      <rect x="12" y="12" width="2" height="1" fill="#fffcee"/>
      {/* star accent */}
      <rect x="9" y="10" width="1" height="1" fill="#fff6a3"/>
      <rect x="8" y="11" width="3" height="1" fill="#fff6a3"/>
      <rect x="9" y="12" width="1" height="1" fill="#fff6a3"/>
    </svg>
  )
}
