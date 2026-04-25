import { useState } from 'react'
import { PROJECT_DATA } from '../../data/projectData'
import styles from './ProjectDetailWindow.module.css'

export default function ProjectDetailWindow({ projectId }) {
  const project = PROJECT_DATA[projectId]
  const [imgIndex, setImgIndex] = useState(0)
  const [isPortrait, setIsPortrait] = useState(false)

  if (!project) return <p className={styles.missing}>project not found</p>

  const images = project.images ?? []

  const prev = () => {
    setIsPortrait(false)
    setImgIndex(i => (i - 1 + images.length) % images.length)
  }
  const next = () => {
    setIsPortrait(false)
    setImgIndex(i => (i + 1) % images.length)
  }

  const handleImgLoad = (e) => {
    setIsPortrait(e.target.naturalHeight > e.target.naturalWidth)
  }

  const webLinks = project.webLink
    ? (Array.isArray(project.webLink) ? project.webLink : [project.webLink])
    : []

  const iframeStyle = {
    transform: `translate(${project.iframeX ?? -50}%, ${project.iframeY ?? -50}%) scale(${project.iframeScale ?? 0.5})`,
  }

  const imgNav = images.length > 1 && (
    <div className={styles.imgNav}>
      <button onClick={prev}>←</button>
      <span>{imgIndex + 1} / {images.length}</span>
      <button onClick={next}>→</button>
    </div>
  )

  return (
    <div className={styles.body}>
      {/* meta: stack + learned */}
      <div className={styles.meta}>
        <div className={styles.tagGroup}>
          <span className={styles.tagLabel}>stack</span>
          {project.stack.map(s => <span key={s} className={styles.tag}>{s}</span>)}
        </div>
        {project.learned?.length > 0 && (
          <div className={styles.tagGroup}>
            <span className={styles.tagLabel}>learned</span>
            {project.learned.map(l => <span key={l} className={`${styles.tag} ${styles.learned}`}>{l}</span>)}
          </div>
        )}
      </div>

      {/* links at top */}
      {(webLinks.length > 0 || project.ghLink) && (
        <div className={styles.linkBar}>
          {webLinks.map((url, i) => (
            <a key={i} href={url} target="_blank" rel="noreferrer" className={`${styles.linkBtn} ${styles.web}`}>
              ↗ visit site
            </a>
          ))}
          {project.ghLink && (
            <a href={project.ghLink} target="_blank" rel="noreferrer" className={`${styles.linkBtn} ${styles.gh}`}>
              ⌂ github
            </a>
          )}
        </div>
      )}

      {/* iframe */}
      {project.type === 'iframe' && project.src && (
        <>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.media}>
            <div className={styles.iframeWrap}>
              <iframe src={project.src} title={project.title} className={styles.iframe} style={iframeStyle} />
            </div>
          </div>
        </>
      )}

      {/* image — portrait gets side-by-side layout */}
      {project.type === 'image' && (
        <div className={`${styles.content} ${isPortrait ? styles.contentPortrait : ''}`}>
          <p className={styles.description}>{project.description}</p>
          {images.length === 0 && (
            <div className={styles.placeholder}>
              <p>images coming soon</p>
            </div>
          )}
          {images.length > 0 && (
            <div className={styles.media}>
              <img
                key={images[imgIndex]}
                src={images[imgIndex]}
                alt={`${project.title} screenshot ${imgIndex + 1}`}
                className={styles.screenshot}
                onLoad={handleImgLoad}
              />
              {imgNav}
            </div>
          )}
        </div>
      )}

      {/* video — autoplay, loop, no controls */}
      {project.type === 'video' && images.length > 0 && (
        <>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.media}>
            <video
              key={images[imgIndex]}
              src={images[imgIndex]}
              className={styles.screenshot}
              autoPlay
              loop
              muted
              playsInline
            />
            {imgNav}
          </div>
        </>
      )}
    </div>
  )
}
