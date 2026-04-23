/* Vivid vinyl record: cyan ring, hot-pink label, lime grooves */
export default function RecordIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      {/* outer ring fill – pixel circle */}
      <rect x="5" y="1" width="6" height="1" fill="#a5e0ff"/>
      <rect x="3" y="2" width="2" height="1" fill="#a5e0ff"/>
      <rect x="11" y="2" width="2" height="1" fill="#a5e0ff"/>
      <rect x="2" y="3" width="1" height="2" fill="#a5e0ff"/>
      <rect x="13" y="3" width="1" height="2" fill="#a5e0ff"/>
      <rect x="1" y="5" width="1" height="6" fill="#a5e0ff"/>
      <rect x="14" y="5" width="1" height="6" fill="#a5e0ff"/>
      <rect x="2" y="11" width="1" height="2" fill="#a5e0ff"/>
      <rect x="13" y="11" width="1" height="2" fill="#a5e0ff"/>
      <rect x="3" y="13" width="2" height="1" fill="#a5e0ff"/>
      <rect x="11" y="13" width="2" height="1" fill="#a5e0ff"/>
      <rect x="5" y="14" width="6" height="1" fill="#a5e0ff"/>
      {/* outline */}
      <rect x="5" y="1" width="6" height="1" fill="#2a0160"/>
      <rect x="3" y="2" width="2" height="1" fill="#2a0160"/>
      <rect x="11" y="2" width="2" height="1" fill="#2a0160"/>
      <rect x="2" y="3" width="1" height="2" fill="#2a0160"/>
      <rect x="13" y="3" width="1" height="2" fill="#2a0160"/>
      <rect x="1" y="5" width="1" height="6" fill="#2a0160"/>
      <rect x="14" y="5" width="1" height="6" fill="#2a0160"/>
      <rect x="2" y="11" width="1" height="2" fill="#2a0160"/>
      <rect x="13" y="11" width="1" height="2" fill="#2a0160"/>
      <rect x="3" y="13" width="2" height="1" fill="#2a0160"/>
      <rect x="11" y="13" width="2" height="1" fill="#2a0160"/>
      <rect x="5" y="14" width="6" height="1" fill="#2a0160"/>
      {/* inner groove ring */}
      <rect x="4" y="3" width="1" height="1" fill="#2a0160"/><rect x="11" y="3" width="1" height="1" fill="#2a0160"/>
      <rect x="3" y="4" width="1" height="1" fill="#2a0160"/><rect x="12" y="4" width="1" height="1" fill="#2a0160"/>
      <rect x="3" y="11" width="1" height="1" fill="#2a0160"/><rect x="12" y="11" width="1" height="1" fill="#2a0160"/>
      <rect x="4" y="12" width="1" height="1" fill="#2a0160"/><rect x="11" y="12" width="1" height="1" fill="#2a0160"/>
      {/* label (inner circle) – hot pink */}
      <rect x="5" y="4" width="6" height="1" fill="#f891e9"/>
      <rect x="4" y="5" width="8" height="6" fill="#f891e9"/>
      <rect x="5" y="11" width="6" height="1" fill="#f891e9"/>
      {/* label outline */}
      <rect x="5" y="4" width="6" height="1" fill="#2a0160"/>
      <rect x="5" y="11" width="6" height="1" fill="#2a0160"/>
      <rect x="4" y="5" width="1" height="6" fill="#2a0160"/>
      <rect x="11" y="5" width="1" height="6" fill="#2a0160"/>
      {/* label lines (lime) */}
      <rect x="6" y="6"  width="4" height="1" fill="#c8ff6e" opacity="0.8"/>
      <rect x="6" y="8"  width="4" height="1" fill="#c8ff6e" opacity="0.8"/>
      <rect x="6" y="10" width="4" height="1" fill="#c8ff6e" opacity="0.8"/>
      {/* center hole */}
      <rect x="7" y="7" width="2" height="2" fill="#2a0160"/>
    </svg>
  )
}
