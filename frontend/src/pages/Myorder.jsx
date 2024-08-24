import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { StoreContext } from "../context/StoreContext.jsx";

const Myorder = () => {
	const { url, token,setCartItems } = useContext(StoreContext);
	const [data, setData] = useState([]);
	const fetchOrder = async () => {
		const response = await axios.post(
			url + "api/order/user-order",
			{},
			{ headers: { token } },
		);
		setData(response.data.data);
		
	};

	useEffect(() => {
		if (token) {
			fetchOrder();
		}
	}, [token]);

	return (
		<div className="p-[3vw] min-h-[100vh]">
			<h2 className="text-[3vw] font-bold mb-[1vw]">My Orders</h2>
			<div className="w-full">
				{data.map((order, index) => {
					if (order.status !== "Delivered") {
						return (
							<div
								key={index}
								className=" md:h-[7vw] md:grid-layout-md grid-layout p-[1vw] text-[1.1vw] gap-[1vw] items-center w-full border border-slate-200 md:mb-[1vw]"
							>
								<img className="w-[6vw]" src={assets.parcel_icon} alt="" />
								<p>
									{order.items.map((item, index) => {
										if (index === order.items.length - 1) {
											return item.name + " x " + item.quantity;
										} else {
											return item.name + " x " + item.quantity + ",";
										}
									})}
								</p>
								<p>${order.amount}.00</p>
								<p>Items : {order.items.length}</p>
								<p>
									<span className="text-orange-500">&#x25cf; </span>
									<b>{order.status}</b>
								</p>
								<button className="bg-orange-200 w-[9vw] p-[0.5vw]">
									Track Order
								</button>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

export default Myorder;
