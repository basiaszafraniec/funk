import styles from './DesktopIcon.module.css'

export default function DesktopIcon({ icon, label }) {
  return (
    <div className={styles.icon}>
      <img src={icon} alt={label} draggable={false} className={styles.img} />
      <p className={styles.label}>{label}</p>
    </div>
  )
}
