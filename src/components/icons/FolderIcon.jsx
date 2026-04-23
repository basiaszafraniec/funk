/* Vivid folder: lime body, hot-pink tab, yellow accent dots */
export default function FolderIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      {/* tab */}
      <rect x="1" y="3" width="4" height="1" fill="#ff5bec"/>
      <rect x="1" y="4" width="5" height="2" fill="#ff5bec"/>
      {/* body */}
      <rect x="1" y="5" width="14" height="9" fill="#c8ff6e"/>
      {/* tab outline */}
      <rect x="1" y="3" width="1" height="3" fill="#2a0160"/>
      <rect x="1" y="3" width="4" height="1" fill="#2a0160"/>
      <rect x="5" y="3" width="1" height="1" fill="#2a0160"/>
      <rect x="5" y="4" width="2" height="1" fill="#2a0160"/>
      {/* body outline */}
      <rect x="1"  y="5"  width="1"  height="9" fill="#2a0160"/>
      <rect x="14" y="5"  width="1"  height="9" fill="#2a0160"/>
      <rect x="1"  y="13" width="14" height="1" fill="#2a0160"/>
      <rect x="6"  y="5"  width="9"  height="1" fill="#2a0160"/>
      {/* inner lines */}
      <rect x="3" y="8"  width="10" height="1" fill="#2a0160" opacity="0.18"/>
      <rect x="3" y="10" width="10" height="1" fill="#2a0160" opacity="0.18"/>
      {/* accent dots */}
      <rect x="3" y="7" width="1" height="1" fill="#fff6a3"/>
      <rect x="5" y="7" width="1" height="1" fill="#fff6a3"/>
      <rect x="7" y="7" width="1" height="1" fill="#fff6a3"/>
      {/* shine */}
      <rect x="2" y="6" width="3" height="1" fill="rgba(255,255,255,0.4)"/>
    </svg>
  )
}
