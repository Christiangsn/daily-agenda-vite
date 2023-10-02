

import { LoginBox } from '../components/loginBox'
import styles from './styles.module.scss'

export function LoginApp () {

  return (
    <main className={`${styles.contentWrapper}`}>
      <LoginBox />
    </main> 

  )
}
 