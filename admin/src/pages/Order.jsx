import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assests/admin_assets/assets";
const Order = ({ url }) => {
	const [data, setData] = useState([]);
	const loadOrderDetails = async () => {
		const response = await axios.get(url + "/api/order/load");
		setData(response.data.data);
	};

	const loadStatus = async (e, orderId) => {
		try {
			const status = e.target.value;
			const response = await axios.post(url + "/api/order/status", {
				orderId: orderId,
				status: status,
			});
			if (response.data.success) {
				loadOrderDetails();
			}
		} catch (error) {
			console.log(error);
			toast("Error");
		}
	};

	useEffect(() => {
		loadOrderDetails();
	}, []);
	return (
		<div className=" min-h-[100vh] w-5/6">
			<div className="px-[3vw] py-[1vw]">
				<h2 className="text-[3vw] font-bold mb-[1vw] ">My Orders</h2>
				<div className=" flex flex-wrap gap-2">
					{data.map((order, index) => {
						if (order.status !== "Delivered") {
							return (
								<div
									key={index}
									className=" sm:grid-layout-lg grid-layout p-[1vw] text-[1.1vw] gap-[1vw] items-center sm:w-full border border-slate-200 md:mb-[1vw] w-[100px] "
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
									<div>
										<p className="font-bold">Address</p>
										<p>First Name : {order.address.firstName}</p>
										<p>Phone : {order.address.phone}</p>
										<p>Street : {order.address.street}</p>
									</div>
									<select
										onChange={(e) => loadStatus(e, order._id)}
										value={order.status}
									>
										<option value="Food Processing">Food Processing</option>
										<option value="Out For Delivery">Out For Deliver</option>
										<option value="Delivered">Delivered</option>
									</select>
								</div>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
};

export default Order;
