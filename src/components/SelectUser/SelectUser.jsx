import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import styles from './SelectUser.module.css';

function SelectUser() {
	const {userId, setUserId} = useContext(UserContext);
    
	const changeUser = (e) => {
		setUserId(Number(e.target.value));
	};

	return (
		<>
			<select className={styles['select-user']} name="user" id="user" value={userId} onChange={changeUser} >
				<option value='1'>Alexander Sergeevich</option>
				<option value='2'>My company</option>
			</select>
		</>
	);
}

export default SelectUser;
