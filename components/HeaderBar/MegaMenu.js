import Link from 'next/link';
import styles from './header.styl';

const MegaMenu = () => (
  <nav className={styles['megamenu-wrapper']}>
    <ul>
      <li>
        <Link prefetch href="/">
          <a className={styles['level-1-item']}>Offer Zone</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/">
          <a className={styles['level-1-item']}>All categories</a>
        </Link>
      </li>
      <ul>
        {
          ['Electronics', 'Fashion', 'Home & Living', 'Beauty & Fragrance', 'Baby Products', 'Books & More'].map((item) => (
            <li>
              <Link prefetch href="/">
                <a className={styles['level-1-item']}>{item}</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </ul>
  </nav>
);

export default MegaMenu
