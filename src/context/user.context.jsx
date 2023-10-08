import { createContext, useState } from 'react';

// Объект, который содержит компоненты (но все равно с большой буквы)
export const UserContext = createContext (
	{
		userId: 1
	}
);

export const UserContextProvider = ({children}) => {
	const [userId, setUserId] = useState(1);

	return <UserContext.Provider value={{userId, setUserId}}>{children}</UserContext.Provider>;
};