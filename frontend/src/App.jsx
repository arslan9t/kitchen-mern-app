import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Downloads from "./components/Downloads";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Myorder from "./pages/Myorder";
import Order from "./pages/Order";

const App = () => {
	const [toggle, setToggle] = useState(false);
	return (
		<div className="relative">
			<Navbar setToggle={setToggle} />
			<div className="">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="cart" element={<Cart setToggle={setToggle} />} />
					<Route path="order" element={<Order />} />
					<Route path="/myorder" element={<Myorder />} />
				</Routes>
			</div>
			{toggle ?
				<>
					<Login setToggle={setToggle} toggle={toggle} />
				</>
			:	<></>}
			<Downloads />
			<Footer />
		</div>
	);
};

export default App;
