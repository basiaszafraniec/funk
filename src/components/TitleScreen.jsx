import { useState, useEffect, useRef } from 'react'
import styles from './TitleScreen.module.css'

const LOAD_MSGS = [
  'loading assets...',
  'waking up cat...',
  'drawing pixels...',
  'opening folders...',
  'almost ready...',
]

export default function TitleScreen({ onEnter }) {
  const [phase, setPhase] = useState('title') // 'title' | 'loading' | 'done'
  const [blocks, setBlocks] = useState(Array(12).fill(false))
  const [msgIndex, setMsgIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const intervalRef = useRef(null)

  function handleEnter() {
    setPhase('loading')
    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setBlocks(b => b.map((_, idx) => idx < i))
      setMsgIndex(Math.floor((i / 12) * LOAD_MSGS.length))
      if (i >= 12) {
        clearInterval(intervalRef.current)
        setTimeout(() => {
          setFading(true)
          setTimeout(() => {
            sessionStorage.setItem('visited', '1')
            onEnter()
          }, 500)
        }, 300)
      }
    }, 100)
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return (
    <div className={`${styles.screen} ${fading ? styles.fadeOut : ''}`}>
      <div className={styles.ticker}>
        <ul className={styles.tickerList}>
          {['basia szafraniec','portfolio','developer','designer','multimedia design'].concat(
            ['basia szafraniec','portfolio','developer','designer','multimedia design']
          ).map((w, i) => <li key={i}>{w}</li>)}
        </ul>
      </div>

      <div className={styles.content}>
        {phase === 'title' && (
          <>
            <img src="/assets/comp.png" alt="" className={styles.icon} />
            <h1 className={styles.name}>basia<br />szafraniec</h1>
            <p className={styles.sub}>developer & designer</p>
            <div className={styles.btnWrap}>
              <button className={styles.btn} onClick={handleEnter}>
                enter ▶
              </button>
            </div>
          </>
        )}

        {phase === 'loading' && (
          <>
            <p className={styles.loadLabel}>loading</p>
            <div className={styles.track}>
              {blocks.map((on, i) => (
                <div key={i} className={`${styles.block} ${on ? styles.on : ''}`} />
              ))}
            </div>
            <p className={styles.loadMsg}>{LOAD_MSGS[msgIndex] || ''}</p>
          </>
        )}
      </div>

      <div className={styles.titleFooter} />
    </div>
  )
}
