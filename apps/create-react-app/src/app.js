import clsx from 'clsx'
import { Tweet } from 'headless-react-tweet'
import styles from './app.module.css'
import './base.css'

export default function App() {
  return (
    <div className={clsx(styles.root, 'react-tweet-theme')}>
      <main className={styles.main}>
        <Tweet id="1701650285830234351" />
      </main>
    </div>
  )
}
