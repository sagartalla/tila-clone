import styles from './header.styl';

const Search = () => (
    <div className={styles['search-wrapper']}>
        <div className={styles['search-input']} contentEditable placeholder="Search your fav item..."></div>
    </div>
);

export default Search;