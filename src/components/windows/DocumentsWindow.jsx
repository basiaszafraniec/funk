import { useState } from 'react'
import styles from './DocumentsWindow.module.css'

const DOCUMENTS = [
  { id: 'cv',             name: 'cv',           file: '/assets/docs/BevisDiploma.pdf' },
  { id: 'recommendation', name: 'recommendation', file: '/assets/docs/recommendations.pdf' },
  { id: 'english-test',   name: 'english test', file: '/assets/docs/english-test.pdf' },
]

export default function DocumentsWindow() {
  const [openDoc, setOpenDoc] = useState(null)

  if (openDoc) {
    return (
      <div className={styles.viewer}>
        <div className={styles.viewerHeader}>
          <button className={styles.backBtn} onClick={() => setOpenDoc(null)}>
            ← back
          </button>
          <span className={styles.viewerTitle}>{openDoc.name}.pdf</span>
          <div className={styles.viewerActions}>
            <a href={openDoc.file} target="_blank" rel="noreferrer" className={styles.docBtn}>
              ↗ open
            </a>
            <a href={openDoc.file} download={openDoc.name + '.pdf'} className={`${styles.docBtn} ${styles.docBtnDark}`}>
              ↓ save
            </a>
          </div>
        </div>
        <iframe src={openDoc.file} title={openDoc.name} className={styles.pdfFrame} />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.ticker}>
        <ul className={styles.tickerList}>
          {['documents','cv','certificates','pdf','documents','cv','certificates','pdf'].map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </div>

      <p className={styles.label}>files</p>

      <div className={styles.grid}>
        {DOCUMENTS.map((doc) => (
          <button key={doc.id} className={styles.fileItem} onClick={() => setOpenDoc(doc)}>
            <img src="/assets/doc1.png" alt="document" className={styles.fileIcon} />
            <p className={styles.fileName}>{doc.name}</p>
          </button>
        ))}
      </div>

      <div className={styles.stripe}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={`${styles.stripeBlock} ${i % 2 === 0 ? styles.stripeOdd : ''}`} />
        ))}
      </div>
    </div>
  )
}
