import styles from './AboutWindow.module.css'

const SKILLS = [
  { label: 'JavaScript', pct: 85 },
  { label: 'React',      pct: 80 },
  { label: 'HTML & CSS', pct: 90 },
  { label: 'Python',     pct: 65 },
  { label: 'Figma',      pct: 75 },
  { label: 'Blender',    pct: 55 },
]

const INTERESTS = ['music', 'drawing', 'game dev', 'pixel art', 'cats', '3D art', 'animation', 'languages']

const SOFT_SKILLS = [
  { text: 'curious & creative',       alt: false },
  { text: 'learning by doing',         alt: true  },
  { text: 'love collaborating',        alt: false },
  { text: 'versatile',                 alt: true  },
  { text: 'great at project work',     alt: false },
]

function SkillBar({ pct }) {
  const blocks = 10
  const filled = Math.round((pct / 100) * blocks)
  return (
    <div className={styles.statTrack}>
      {Array.from({ length: blocks }).map((_, i) => (
        <div key={i} className={`${styles.statBlock} ${i < filled ? styles.filled : ''}`} />
      ))}
    </div>
  )
}

export default function AboutWindow() {
  const TICKER_WORDS = ['about me', 'skills', 'interests', 'education', 'soft skills']

  return (
    <div className={styles.container}>
      {/* inner ticker */}
      <div className={styles.ticker}>
        <ul className={styles.tickerList}>
          {[...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS].map((w, i) => <li key={i}>{w}</li>)}
        </ul>
      </div>

      <div className={styles.body}>
        {/* row 1: avatar | bio | skills */}
        <div className={styles.row1}>
          {/* avatar */}
          <div className={`${styles.section} ${styles.avCol}`}>
            <div className={styles.avStripe}>{Array.from({length:8}).map((_,i)=><div key={i}/>)}</div>
            <div className={styles.avInner}>
              <div className={styles.avPortrait}>
                <img src="/assets/prof1.png" alt="Basia"
                  onError={e => { e.target.style.display = 'none' }} />
              </div>
              <p className={styles.avName}>basia<br/>szafraniec</p>
              <span className={styles.avTag}>dev & designer</span>
              <div className={styles.avSocial}>
                <a href="https://github.com/basiaszafraniec" target="_blank" rel="noreferrer" className={styles.avSocialLink}><span>⌂</span>github</a>
                <a href="mailto:basia.szafraniec@gmail.com" className={styles.avSocialLink}><span>✉</span>email</a>
                <a href="https://www.linkedin.com/in/basia-szafraniec" target="_blank" rel="noreferrer" className={styles.avSocialLink}><span className={styles.linkedinBadge}>in</span>linkedin</a>
              </div>
            </div>
          </div>

          {/* bio */}
          <div className={styles.section}>
            <p className={styles.sectionLabel}>bio</p>
            <p className={styles.bioText}>
              Hi! I'm Basia — a developer and designer studying Multimedia Design in Denmark.
              I love building things that are both functional and fun, and I enjoy working
              across the full stack. When I'm not coding I'm drawing, making music, or
              modelling things in Blender.<span className={styles.cursor} />
            </p>
          </div>

          {/* hard skills */}
          <div className={styles.section}>
            <p className={styles.sectionLabel}>skills</p>
            <div className={styles.skillsBody}>
              {SKILLS.map(s => (
                <div key={s.label} className={styles.statRow}>
                  <span className={styles.statLabel}>{s.label}</span>
                  <SkillBar pct={s.pct} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* row 2: interests | soft skills | education */}
        <div className={styles.row2}>
          {/* interests */}
          <div className={styles.section}>
            <p className={styles.sectionLabel}>interests</p>
            <div className={styles.panelBody}>
              <p className={styles.intFlow}>
                {INTERESTS.map((w, i) => (
                  <span key={w}>
                    <span className={styles.intWord}>{w}</span>
                    {i < INTERESTS.length - 1 && <span className={styles.intSep}>·</span>}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* soft skills */}
          <div className={styles.section}>
            <p className={styles.sectionLabel}>soft skills</p>
            <div className={styles.panelBody}>
              {SOFT_SKILLS.map(s => (
                <div key={s.text} className={styles.softRow}>
                  <div className={`${styles.softAccent} ${s.alt ? styles.alt : ''}`} />
                  {s.text}
                </div>
              ))}
            </div>
          </div>

          {/* education */}
          <div className={styles.section}>
            <p className={styles.sectionLabel}>education</p>
            <div className={styles.panelBody}>
              <p className={styles.eduSchool}>Multimedia Design</p>
              <p className={styles.eduDeg}>UCL Erhvervsakademi og Professionshøjskole, Denmark</p>
              <span className={styles.eduYear}>2023–present</span>
            </div>
            <div className={styles.eduStripe}>{Array.from({length:8}).map((_,i)=><div key={i}/>)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
