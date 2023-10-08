import styles from'./BodyContent.module.css';
function BodyContent({children}) {
	return (
		<div className={styles['body-content']}>
			{children}
		</div>
	);
}

export default BodyContent;
