import styles from './Header.module.css';
import SelectUser from '../SelectUser/SelectUser';
function Header() {
	return (
		<>
			<img className={styles['logotype']} src="/logotype.svg" alt="Логотип" />
			<SelectUser />
		</>
	);
}

export default Header;
