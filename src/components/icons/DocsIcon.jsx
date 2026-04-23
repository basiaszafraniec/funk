/* Vivid docs: cyan back page, cream front, lime lines, hot-pink clip */
export default function DocsIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      {/* back page – cyan */}
      <rect x="4" y="2" width="9" height="11" fill="#a5e0ff"/>
      <rect x="4" y="2" width="9" height="1"  fill="#2a0160"/>
      <rect x="4" y="2" width="1" height="11" fill="#2a0160"/>
      <rect x="12" y="2" width="1" height="11" fill="#2a0160"/>
      <rect x="4" y="12" width="9" height="1" fill="#2a0160"/>
      {/* front page – cream */}
      <rect x="3" y="4" width="9" height="11" fill="#fffcee"/>
      <rect x="3" y="4" width="9" height="1"  fill="#2a0160"/>
      <rect x="3" y="4" width="1" height="11" fill="#2a0160"/>
      <rect x="11" y="4" width="1" height="11" fill="#2a0160"/>
      <rect x="3" y="14" width="9" height="1" fill="#2a0160"/>
      {/* text lines – lime */}
      <rect x="5" y="6"  width="6" height="1" fill="#430396" opacity="0.4"/>
      <rect x="5" y="8"  width="6" height="1" fill="#430396" opacity="0.4"/>
      <rect x="5" y="10" width="6" height="1" fill="#430096" opacity="0.4"/>
      <rect x="5" y="12" width="4" height="1" fill="#430396" opacity="0.4"/>
      {/* dog-ear */}
      <rect x="9"  y="4" width="2" height="2" fill="#a5e0ff"/>
      <rect x="9"  y="4" width="2" height="1" fill="#2a0160"/>
      <rect x="10" y="4" width="1" height="2" fill="#2a0160"/>
      {/* hot-pink paperclip */}
      <rect x="8" y="1" width="1" height="1" fill="#ff5bec"/>
      <rect x="9" y="1" width="1" height="1" fill="#ff5bec"/>
      <rect x="7" y="2" width="1" height="4" fill="#ff5bec"/>
      <rect x="10" y="2" width="1" height="4" fill="#ff5bec"/>
      <rect x="8" y="5" width="2" height="1" fill="#ff5bec"/>
      {/* clip outline */}
      <rect x="8" y="1" width="2" height="1" fill="#2a0160"/>
      <rect x="7" y="2" width="1" height="4" fill="#2a0160"/>
      <rect x="10" y="2" width="1" height="4" fill="#2a0160"/>
      <rect x="8" y="5" width="2" height="1" fill="#2a0160"/>
    </svg>
  )
}
