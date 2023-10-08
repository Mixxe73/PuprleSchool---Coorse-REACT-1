import styles from './Button.module.css';
import cn from 'classnames';
function Button({children, onClick}) {

	return (
		<button className={cn(styles['button'], styles['accent'])} onClick={onClick}>{children}</button>
	);
}

export default Button;
