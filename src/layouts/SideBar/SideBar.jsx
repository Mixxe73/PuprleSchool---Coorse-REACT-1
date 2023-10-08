import styles from './SideBar.module.css';
function SideBar({children}) {
	return (
		<div className={styles['sidebar']}>
			{children}
		</div>
	);
}

export default SideBar;
