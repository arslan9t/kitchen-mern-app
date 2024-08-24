import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const order = () => {
	const { getTotal, token, food_list, setCartItems, cartItems, url } =
		useContext(StoreContext);
	const navigate = useNavigate();
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		street: "",
		city: "",
		state: "",
		zipcode: "",
		phone: "",
		country: "",
	});

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setData((prev) => ({ ...data, [name]: value }));
	};

	const placeOrder = async (e) => {
		e.preventDefault();
		let orderItems = [];
		food_list.map((item) => {
			if (cartItems[item._id] > 0) {
				let itemInfo = item;
				itemInfo["quantity"] = cartItems[item._id];
				orderItems.push(itemInfo);
			}
		});
		let orderData = {
			address: data,
			items: orderItems,
			amount: getTotal() + 2,
		};
		let res = await axios.post(url + "api/order/pay", orderData, {
			headers: { token },
		});
	};

	useEffect(() => {
		if (!token) {
			navigate("/cart");
		} else if (getTotal() === 0) {
			navigate("/cart");
		}
	}, [token]);
	return (
		<div className="flex w-full p-[4vw] min-[100vh] ">
			<form onSubmit={placeOrder} className="flex flex-col mx-auto ">
				<div className="flex">
					<input
						required
						className="border-[0.2vw] text-[1.5vw] w-full border-orange-700 rounded p-[2vw] m-[1vw] h-[1vw] "
						type="text"
						name="firstName"
						onChange={onChangeHandler}
						value={data.firstName}
						placeholder="Name"
					/>
					<input
						required
						className="border-[0.2vw] text-[1.5vw] w-full border-orange-700 rounded p-[2vw] m-[1vw] h-[1vw] "
						type="text"
						name="lastName"
						onChange={onChangeHandler}
						value={data.lastName}
						placeholder="Last Name"
					/>
				</div>
				<div className="flex flex-col">
					<input
						required
						className="border-[0.2vw] text-[1.5vw]  border-orange-700 rounded p-[2vw] m-[1vw] h-[1vw]  "
						type="email"
						name="email"
						onChange={onChangeHandler}
						value={data.email}
						placeholder="Email"
					/>
					<input
						required
						className="border-[0.2vw] text-[1.5vw] border-orange-700 rounded p-[2vw] m-[1vw] h-[1vw] "
						type="text"
						name="street"
						onChange={onChangeHandler}
						value={data.street}
						placeholder="Street"
					/>
				</div>
				<div className="flex">
					<input
						required
						className="border-[0.2vw] text-[1.5vw] w-full border-orange-700 rounded p-[2vw] m-[1vw] h-[1vw] "
						type="text"
						name="city"
						onChange={onChangeHandler}
						value={data.city}
						placeholder="City"
					/>
					<input
						required
						className="border-[0.2vw] text-[1.5vw] w-full border-orange-700 rounded p-[2vw] m-[1vw] h-[1vw] "
						type="text"
						name="state"
						onChange={onChangeHandler}
						value={data.state}
						placeholder="State"
					/>
				</div>
				<div className="flex">
					<input
						required
						className="border-[0.2vw] text-[1.5vw] w-full border-orange-700 rounded p-[2vw] m-[1vw] h-[1vw] "
						type="text"
						name="zipcode"
						onChange={onChangeHandler}
						value={data.zipcode}
						placeholder="Zip Code"
					/>
					<input
						required
						className="border-[0.2vw] text-[1.5vw] w-full border-orange-700 rounded p-[2vw] m-[1vw] h-[1vw] "
						type="text"
						name="country"
						onChange={onChangeHandler}
						value={data.country}
						placeholder="Country"
					/>
				</div>
				<input
					required
					className="border-[0.2vw] text-[1.5vw] border-orange-700 rounded p-[2vw] m-[1vw] h-[1vw] "
					type="text"
					name="phone"
					onChange={onChangeHandler}
					value={data.phone}
					placeholder="Phone"
				/>
				<div className="py-[3vw] px-[0.5vh]">
					<h1 className="text-[2vw] font-bold">Cart Total</h1>
					<div className="flex justify-between p-[0.5vw]">
						<h1 className="text-[1.5vw] font-bold">Subtotal</h1>
						<p className="text-[1vw]">${getTotal()}</p>
					</div>
					<hr className="bg-slate-900 h-[0.2vh]" />
					<div className="flex justify-between p-[0.5vw]">
						<h1 className="text-[1.5vw] font-bold">Delivery Fee</h1>
						<p className="text-[1vw]">${2}</p>
					</div>

					<hr className="bg-slate-900 h-[0.2vh]" />
					<div className="flex justify-between p-[1vw]">
						<h1 className="text-[1.5vw] font-bold">Total</h1>
						<p className="text-[1vw]">${getTotal() + 2}</p>
					</div>
					<hr className="bg-slate-900 h-[0.2vh]" />
					<button
						type="submit"
						onClick={() => navigate("/order")}
						className="p-[1vw] mt-[1vw] bg-orange-700 rounded text-white"
					>
						<p className="text-[1vw]">Place Order</p>
					</button>
				</div>
			</form>
		</div>
	);
};

export default order;
