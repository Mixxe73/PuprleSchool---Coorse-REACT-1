import './JournalList.css';
import JournalTab from '../JournalTab/JournalTab';
import JournalCardButton from '../JournalCardButton/JournalCardButton';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';
function JournalList({ items, setItem }) {
	const {userId} = useContext(UserContext);

	const sortItemsTime = (a, b) => {
		if (a.date > b.date) {
			return -1;
		} else {
			return 1;
		}
	};
	
	const filteredItems = useMemo(() => items.filter(el => el.userId === userId).sort(sortItemsTime), [items, userId]);

	if (items.length === 0) {
		return <p>Список записей пуст</p>;
	}

	return <>{filteredItems.map(el => (
		<JournalCardButton key={el.id} onClick={() => setItem(el)}>
			<JournalTab
				title={el.title}
				text={el.post}
				date={el.date}
			/>
		</JournalCardButton>
	))}
	</>;

}

export default JournalList;
