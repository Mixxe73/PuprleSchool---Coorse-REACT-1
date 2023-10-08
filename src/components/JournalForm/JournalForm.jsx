import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import cn from 'classnames';
import { UserContext } from '../../context/user.context';


function JournalForm({ onSubmit, data, onDelete }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const { userId } = useContext(UserContext);

	const focusErrorInput = (isValid) => {
		switch (true) {
		case !isValid.title: {
			titleRef.current.focus();
			break;
		}
		case !isValid.date: {
			dateRef.current.focus();
			break;
		}
		case !isValid.post: {
			postRef.current.focus();
			break;
		}
		}
	};

	useEffect(() => {
		if (!data) {
			dispatchForm({ type: 'CLEAR' });
		}
		dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
	}, [data]);

	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.post || !isValid.date) {
			focusErrorInput(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({ type: 'SET_VALUE', payload: { userId } });
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { userId }});
	}, [userId]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispatchForm({ type: 'CLEAR' });
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input type='title' value={values.title} ref={titleRef} isValid={isValid.title} onChange={onChange} name='title' appearence="title" />
				{data?.id && <button className={styles['delete']} type='button' onClick={deleteJournalItem}>
					<img src="/delete.svg" alt="удалить" />
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-lable']}>
					<img src="/date.svg" alt="Календарь" />
					<span>Дата</span>
				</label>
				<Input type='date' value={values.date ? new Date (values.date).toISOString().slice(0, 10) : ''} ref={dateRef} isValid={isValid.date} onChange={onChange} name='date' id='date' />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-lable']}>
					<img src="/folder.svg" alt="Метки" />
					<span>Метки</span>
				</label>
				<Input type='text' value={values.tag} onChange={onChange} id='tag' name='tag' />
			</div>
			<div>
				<textarea name="post" value={values.post} ref={postRef} onChange={onChange} id="post" cols="30" rows="10" className={cn(styles['input'], {
					[[styles['invalid']]]: !isValid.post
				})}></textarea>
			</div>
			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;
