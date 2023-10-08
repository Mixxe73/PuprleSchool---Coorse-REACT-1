import JournalCardButton from '../JournalCardButton/JournalCardButton';
import styles from './JournalAddButton.module.css';
function JournalAddButton({ clearForm }) {
	return (
		<JournalCardButton className={styles['journal-add-button']} onClick={clearForm}>
			<img src='./plus.svg' />
            Новое воспоминание
		</JournalCardButton>
	);
}

export default JournalAddButton;
