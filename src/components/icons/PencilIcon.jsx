/* Vivid pencil: lime body, hot-pink eraser, cyan highlight */
export default function PencilIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      {/* eraser (top-right) */}
      <rect x="11" y="1" width="3" height="3" fill="#f891e9"/>
      <rect x="11" y="1" width="3" height="1" fill="#2a0160"/>
      <rect x="11" y="1" width="1" height="3" fill="#2a0160"/>
      <rect x="13" y="1" width="1" height="3" fill="#2a0160"/>
      {/* eraser band */}
      <rect x="11" y="4" width="3" height="1" fill="#2a0160"/>
      {/* body – lime green diagonal */}
      <rect x="10" y="5"  width="3" height="1" fill="#c8ff6e"/>
      <rect x="9"  y="6"  width="3" height="1" fill="#c8ff6e"/>
      <rect x="8"  y="7"  width="3" height="1" fill="#c8ff6e"/>
      <rect x="7"  y="8"  width="3" height="1" fill="#c8ff6e"/>
      <rect x="6"  y="9"  width="3" height="1" fill="#c8ff6e"/>
      <rect x="5"  y="10" width="3" height="1" fill="#c8ff6e"/>
      <rect x="4"  y="11" width="3" height="1" fill="#c8ff6e"/>
      <rect x="3"  y="12" width="3" height="1" fill="#c8ff6e"/>
      {/* outline – top edge */}
      <rect x="10" y="4"  width="3" height="1" fill="#2a0160"/>
      <rect x="9"  y="5"  width="1" height="1" fill="#2a0160"/>
      <rect x="8"  y="6"  width="1" height="1" fill="#2a0160"/>
      <rect x="7"  y="7"  width="1" height="1" fill="#2a0160"/>
      <rect x="6"  y="8"  width="1" height="1" fill="#2a0160"/>
      <rect x="5"  y="9"  width="1" height="1" fill="#2a0160"/>
      <rect x="4"  y="10" width="1" height="1" fill="#2a0160"/>
      <rect x="3"  y="11" width="1" height="1" fill="#2a0160"/>
      {/* outline – bottom edge */}
      <rect x="12" y="5"  width="1" height="1" fill="#2a0160"/>
      <rect x="11" y="6"  width="1" height="1" fill="#2a0160"/>
      <rect x="10" y="7"  width="1" height="1" fill="#2a0160"/>
      <rect x="9"  y="8"  width="1" height="1" fill="#2a0160"/>
      <rect x="8"  y="9"  width="1" height="1" fill="#2a0160"/>
      <rect x="7"  y="10" width="1" height="1" fill="#2a0160"/>
      <rect x="6"  y="11" width="1" height="1" fill="#2a0160"/>
      <rect x="5"  y="12" width="1" height="1" fill="#2a0160"/>
      {/* tip triangle */}
      <rect x="2" y="12" width="3" height="1" fill="#2a0160"/>
      <rect x="2" y="13" width="2" height="1" fill="#2a0160"/>
      <rect x="2" y="14" width="1" height="1" fill="#2a0160"/>
      <rect x="3" y="13" width="1" height="1" fill="#c8ff6e"/>
      {/* cyan highlight stripe */}
      <rect x="10" y="5" width="1" height="1" fill="#a5e0ff" opacity="0.9"/>
      <rect x="9"  y="6" width="1" height="1" fill="#a5e0ff" opacity="0.9"/>
      <rect x="8"  y="7" width="1" height="1" fill="#a5e0ff" opacity="0.9"/>
      <rect x="7"  y="8" width="1" height="1" fill="#a5e0ff" opacity="0.9"/>
      <rect x="6"  y="9" width="1" height="1" fill="#a5e0ff" opacity="0.9"/>
    </svg>
  )
}
