import Link from "next/link";

import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <div className={styles.div}>
      <h1>Vefforritunarsíðan</h1>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="/">Forsíða</Link>
          </li>
          <li className={styles.li}>
            <Link href="/flokkar">Flokkar</Link>
          </li>
          <li className={styles.li}>
            <Link href="/breyta">Bæta við spurningu</Link>
          </li>
          <li className={styles.li}>
            <Link href="/breyta-flokk">Breyta flokk</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
