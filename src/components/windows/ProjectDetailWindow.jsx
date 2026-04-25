import { useState } from 'react'
import { PROJECT_DATA } from '../../data/projectData'
import styles from './ProjectDetailWindow.module.css'

export default function ProjectDetailWindow({ projectId }) {
  const project = PROJECT_DATA[projectId]
  const [imgIndex, setImgIndex] = useState(0)

  if (!project) return <p className={styles.missing}>project not found</p>

  const images = project.images ?? []
  const prev = () => setImgIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setImgIndex(i => (i + 1) % images.length)

  const webLinks = project.webLink
    ? (Array.isArray(project.webLink) ? project.webLink : [project.webLink])
    : []

  const iframeStyle = {
    transform: `translate(${project.iframeX ?? -50}%, ${project.iframeY ?? -50}%) scale(${project.iframeScale ?? 0.5})`,
  }

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

      {/* description */}
      <p className={styles.description}>{project.description}</p>

      {/* media */}
      {project.type === 'iframe' && project.src && (
        <div className={styles.media}>
          <div className={styles.iframeWrap}>
            <iframe src={project.src} title={project.title} className={styles.iframe} style={iframeStyle} />
          </div>
        </div>
      )}

      {project.type === 'image' && images.length === 0 && (
        <div className={styles.placeholder}>
          <p>images coming soon</p>
        </div>
      )}

      {project.type === 'image' && images.length > 0 && (
        <div className={styles.media}>
          <img
            src={images[imgIndex]}
            alt={`${project.title} screenshot ${imgIndex + 1}`}
            className={styles.screenshot}
          />
          {images.length > 1 && (
            <div className={styles.imgNav}>
              <button onClick={prev}>←</button>
              <span>{imgIndex + 1} / {project.images.length}</span>
              <button onClick={next}>→</button>
            </div>
          )}
        </div>
      )}

      {project.type === 'video' && images.length > 0 && (
        <div className={styles.media}>
          <video
            key={images[imgIndex]}
            src={images[imgIndex]}
            className={styles.screenshot}
            controls
            playsInline
          />
          {images.length > 1 && (
            <div className={styles.imgNav}>
              <button onClick={prev}>←</button>
              <span>{imgIndex + 1} / {images.length}</span>
              <button onClick={next}>→</button>
            </div>
          )}
        </div>
      )}

      {/* links */}
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
    </div>
  )
}
