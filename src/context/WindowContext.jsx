import { createContext, useContext, useState, useCallback, useRef } from 'react'

const WindowContext = createContext(null)

let nextId = 1

const DEFAULT_POSITIONS = {
  about:     { x: 130, y: 30  },
  projects:  { x: 150, y: 35  },
  audio:     { x: 220, y: 50  },
  doodle:    { x: 180, y: 45  },
  documents: { x: 140, y: 40  },
  project:   { x: 200, y: 60  },  // individual project windows
}

export function WindowProvider({ children }) {
  const [windows, setWindows]   = useState([])
  const [stickers, setStickers] = useState([])
  const topZ = useRef(100)

  // meta: optional extra data (e.g. { projectId: 'suwmania' })
  const openWindow = useCallback((type, meta = {}) => {
    setWindows((prev) => {
      // For project detail windows — one per projectId
      const existing = type === 'project'
        ? prev.find(w => w.type === 'project' && w.meta?.projectId === meta.projectId)
        : prev.find(w => w.type === type)

      if (existing) {
        topZ.current += 1
        return prev.map(w =>
          w.id === existing.id ? { ...w, zIndex: topZ.current, minimized: false } : w
        )
      }

      topZ.current += 1
      const base   = DEFAULT_POSITIONS[type] || { x: 80, y: 80 }
      const offset = prev.filter(w => w.type === type).length * 24
      return [
        ...prev,
        {
          id: nextId++,
          type,
          meta,
          position: { x: base.x + offset, y: base.y + offset },
          zIndex: topZ.current,
          minimized: false,
        },
      ]
    })
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }, [])

  const focusWindow = useCallback((id) => {
    topZ.current += 1
    const z = topZ.current
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: z } : w))
  }, [])

  const moveWindow = useCallback((id, position) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position } : w))
  }, [])

  const minimizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: !w.minimized } : w))
  }, [])

  const addSticker = useCallback((dataUrl) => {
    setStickers(prev => [
      ...prev,
      {
        id: nextId++,
        dataUrl,
        x: 120 + Math.random() * 200,
        y: 80  + Math.random() * 160,
        rotate: (Math.random() * 10 - 5).toFixed(1) + 'deg',
      },
    ])
  }, [])

  const removeSticker = useCallback((id) => {
    setStickers(prev => prev.filter(s => s.id !== id))
  }, [])

  return (
    <WindowContext.Provider value={{
      windows, stickers,
      openWindow, closeWindow, focusWindow, moveWindow, minimizeWindow,
      addSticker, removeSticker,
    }}>
      {children}
    </WindowContext.Provider>
  )
}

export const useWindows = () => useContext(WindowContext)
