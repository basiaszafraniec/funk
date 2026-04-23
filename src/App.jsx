import { useState } from 'react'
import { WindowProvider } from './context/WindowContext'
import TitleScreen from './components/TitleScreen'
import Desktop from './components/Desktop'

export default function App() {
  const [entered, setEntered] = useState(() => !!sessionStorage.getItem('visited'))

  return (
    <WindowProvider>
      {!entered && <TitleScreen onEnter={() => setEntered(true)} />}
      {entered && <Desktop />}
    </WindowProvider>
  )
}
