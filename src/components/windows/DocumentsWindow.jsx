import { useState } from 'react'
import styles from './DocumentsWindow.module.css'

const DOCUMENT_FS = {
  root: [
    { id: 'certificates', name: 'certificates' },
    { id: 'diplomas',     name: 'diplomas'     },
    { id: 'references',   name: 'references'   },
  ],
  certificates: [
    {
      id:   'english-cert',
      name: 'English Certificate',
      file: '/assets/docs/english-test.pdf',
    },
    {
      id:   'fcc-cert',
      name: 'FCC Certificate',
      file: null, // add '/assets/docs/fcc-cert.pdf' once you save it as PDF
      link: 'https://www.freecodecamp.org/certification/very_tiny_foot/responsive-web-design-v9',
    },
  ],
  diplomas: [
    {
      id:   'md-diploma',
      name: 'Multimedia Design Diploma',
      file: '/assets/docs/MD-diploma-supplement.pdf',
    },
  ],
  references: [
    {
      id:   'recommendations',
      name: 'Recommendations',
      file: '/assets/docs/recommendations.pdf',
    },
  ],
}

export default function DocumentsWindow() {
  const [activeFolder, setActiveFolder] = useState(null)
  const [openDoc, setOpenDoc] = useState(null)

  const folders = DOCUMENT_FS.root
  const files   = activeFolder ? DOCUMENT_FS[activeFolder] : []

  if (openDoc) {
    return (
      <div className={styles.viewer}>
        <div className={styles.viewerHeader}>
          <button className={styles.backBtn} onClick={() => setOpenDoc(null)}>← back</button>
          <span className={styles.viewerTitle}>{openDoc.name}</span>
          <div className={styles.viewerActions}>
            {openDoc.link && (
              <a href={openDoc.link} target="_blank" rel="noreferrer" className={`${styles.docBtn} ${styles.docBtnDark}`}>
                ↗ open original
              </a>
            )}
            {openDoc.file && (
              <>
                <a href={openDoc.file} target="_blank" rel="noreferrer" className={styles.docBtn}>↗ open</a>
                <a href={openDoc.file} download={openDoc.name + '.pdf'} className={`${styles.docBtn} ${styles.docBtnDark}`}>↓ save</a>
              </>
            )}
          </div>
        </div>

        {openDoc.file ? (
          <iframe src={openDoc.file} title={openDoc.name} className={styles.pdfFrame} />
        ) : (
          <div className={styles.linkOnly}>
            <p className={styles.linkOnlyLabel}>this certificate lives online</p>
            <a href={openDoc.link} target="_blank" rel="noreferrer" className={`${styles.docBtn} ${styles.docBtnDark} ${styles.linkOnlyBtn}`}>
              ↗ open {openDoc.name}
            </a>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={styles.layout}>
      {/* sidebar — folders */}
      <div className={styles.sidebar}>
        <p className={styles.colLabel}>folders</p>
        <div className={styles.folderList}>
          {folders.map(f => (
            <div
              key={f.id}
              className={`${styles.folderRow} ${activeFolder === f.id ? styles.active : ''}`}
              onClick={() => setActiveFolder(f.id)}
            >
              <div className={styles.folderIcon} />
              {f.name}
              <span className={styles.folderCount}>{DOCUMENT_FS[f.id]?.length}</span>
            </div>
          ))}
        </div>
      </div>

      {/* file grid */}
      <div className={styles.middle}>
        <p className={styles.colLabel}>files</p>
        <div className={styles.fileGrid}>
          {!activeFolder && <p className={styles.emptyGrid}>← select a folder</p>}
          {files.map(doc => (
            <div key={doc.id} className={styles.fileItem} onClick={() => setOpenDoc(doc)}>
              <div className={styles.fileIcon} />
              <p className={styles.fileName}>{doc.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
