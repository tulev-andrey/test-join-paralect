import { ForkType } from '../../types'
import styles from './Fork.module.css'

export function Fork({ text }: { text: ForkType }) {
  return (
    <div>
      <p className={styles.row}>{text?.min || 0}</p> - <p className={styles.row}>{text?.max || 0}</p>
    </div>
  )
}
