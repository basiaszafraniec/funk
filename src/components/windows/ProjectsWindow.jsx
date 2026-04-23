import { useState } from 'react'
import { FILE_SYSTEM } from '../../data/projectData'
import { useWindows } from '../../context/WindowContext'
import styles from './ProjectsWindow.module.css'

export default function ProjectsWindow() {
  const [activeFolder, setActiveFolder] = useState(null)
  const { openWindow } = useWindows()

  const folders = FILE_SYSTEM.root
  const files   = activeFolder ? FILE_SYSTEM[activeFolder] : []

  return (
    <div className={styles.layout}>
      {/* sidebar — folders */}
      <div className={styles.sidebar}>
        <p className={styles.colLabel}>folders</p>
        <div className={styles.folderList}>
          {folders.map(f => (
            <div
              key={f.target}
              className={`${styles.folderRow} ${activeFolder === f.target ? styles.active : ''}`}
              onClick={() => setActiveFolder(f.target)}
            >
              <div className={styles.folderIcon} />
              {f.name}
              <span className={styles.folderCount}>{FILE_SYSTEM[f.target]?.length}</span>
            </div>
          ))}
        </div>
      </div>

      {/* middle — file grid */}
      <div className={styles.middle}>
        <p className={styles.colLabel}>files</p>
        <div className={styles.fileGrid}>
          {!activeFolder && <p className={styles.emptyGrid}>← select a folder</p>}
          {files.map(file => (
            <div
              key={file.id}
              className={styles.fileItem}
              onDoubleClick={() => openWindow('project', { projectId: file.id })}
              onClick={() => openWindow('project', { projectId: file.id })}
            >
              <div className={styles.fileIcon} />
              <p className={styles.fileName}>{file.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
