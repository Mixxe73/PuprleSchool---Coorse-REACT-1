import styles from './JournalTab.module.css';
function JournalTab({title, date ,post}) {
	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);
	return (
		<>
			<h2 className={styles['journal-tab__header']}>{title}</h2>
			<h2 className={styles['journal-tab__body']}>
				<div className={styles['journal-tab__date']}>{formatedDate}</div>
				<div className={styles['journal-tab__text']}>{post}</div>
			</h2>
		</>
	);
}

export default JournalTab;
