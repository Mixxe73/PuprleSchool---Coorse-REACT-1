import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Input = forwardRef(function Input({ isValid = true, appearence = 'text', className, ...props }, ref) {
	return (
		<input {...props} ref={ref} className={cn(className, {
			[styles['invalid']]: !isValid,
			[styles['input-title']]: appearence == 'title',
			[styles['input']]: appearence == 'text'
		})} />
	);
});

export default Input;