import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
	const url = "http://localhost:3000";
	const [token, setToken] = useState("");
	const context = {
		url,
		token,
		setToken,
	};

	useEffect(() => {
		async function loadData() {
			if (localStorage.getItem("adminToken")) {
				setToken(localStorage.getItem("adminToken"));
			}
		}
		loadData();
	}, []);

	return (
		<StoreContext.Provider value={context}>{children}</StoreContext.Provider>
	);
};

export default StoreContextProvider;
