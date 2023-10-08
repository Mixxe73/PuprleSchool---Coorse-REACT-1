import './App.css';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import Header from './components/Header/Header';
import JournalForm from './components/JournalForm/JournalForm';
import SideBar from './layouts/SideBar/SideBar';
import BodyContent from './layouts/BodyContent/BodyContent';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map(i => ({
		...i, date: new Date(i.date)
	}));
}

function App() {
	const [items, setItems] = useLocalStorage('data');
	const [currentItem, setCurrentItem] = useState(null);
	const addItem = item => {
		if (!item.id) {
			setItems([...mapItems(items), {
				...item,
				date: new Date(item.date),
				id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
			}]);
		} else {
			setItems([...mapItems(items).map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		}
		
	};

	const deleteItem = (id) => {
		setItems([...items.filter(i=>i.id !== id)]);
	};

	const clearForm = () => {
		setCurrentItem(null);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<SideBar>
					<Header />
					<JournalAddButton clearForm={clearForm} />
					<JournalList items={mapItems(items)} setItem={setCurrentItem} />
				</SideBar>
				<BodyContent>
					<JournalForm onSubmit={addItem} onDelete={deleteItem} data={currentItem} />
				</BodyContent>
			</div>
		</UserContextProvider>
	);
}

export default App;
