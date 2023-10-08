import styles from'./JournalCardButton.module.css';
import cn from 'classnames';
function JournalCardButton({children, className, ...props}) {
	return (
		<button className={cn(styles['journal-card-button'], {
			[className] : className
		})} {...props}>{children}</button>
	);
}

export default JournalCardButton;
