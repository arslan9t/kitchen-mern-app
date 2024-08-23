import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const url = "https://kitchen-mern-app.onrender.com/";

	const [token, setToken] = useState("");
	const [food_list, setFoodlist] = useState([]);
	const [cartItems, setCartItems] = useState({});

	const addToCart = async (itemId) => {
		if (!cartItems[itemId]) {
			setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
		} else {
			setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		}
		try {
			if (token) {
				await axios.post(
					url + "api/cart/add",
					{ itemId },
					{ headers: { token } },
				);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const removeFromCart = async (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
		try {
			if (token) {
				await axios.post(
					url + "api/cart/remove",
					{ itemId },
					{ headers: { token } },
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getTotal = () => {
		let total = 0;
		for (const item in cartItems) {
			if (cartItems[item]) {
				let d = food_list.find((food) => food._id === item);
				total += cartItems[item] * d.price;
			}
		}
		return total;
	};

	const fetchFood = async () => {
		const response = await axios.get(url + "api/food/list");
		setFoodlist(response.data.data);
	};

	const loadCartData = async (token) => {
		const response = await axios.post(
			url + "api/cart/get",
			{},
			{ headers: { token } },
		);
		setCartItems(response.data.cartItems);
	};

	useEffect(() => {
		async function loadData() {
			await fetchFood();
			if (localStorage.getItem("token")) {
				setToken(localStorage.getItem("token"));
				await loadCartData(localStorage.getItem("token"));
			}
			getTotal();
		}
		loadData();
	}, []);

	const contextValue = {
		food_list,
		cartItems,
		url,
		token,
		setToken,
		addToCart,
		removeFromCart,
		getTotal,
	};
	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
