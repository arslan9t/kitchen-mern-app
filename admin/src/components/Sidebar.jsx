import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assests/admin_assets/assets";

const Sidebar = () => {
	return (
		<div className="w-[20vw] border-r-2 border-black  flex flex-col min-h-[93vh] ">
			<NavLink
				to="/add"
				className="focus:bg-orange-100 flex gap-2  border-black items-center border-b-2   p-[1vw]"
			>
				<div className="size-[3vw] h-full">
					<img src={assets.add_icon} alt="" />
				</div>
				<p className="text-[1.5vw] ">
					<span>Add Items</span>
				</p>
			</NavLink>
			<NavLink
				to="/list"
				className="focus:bg-orange-100 flex gap-2  border-black items-center  border-b-2 p-[1vw]"
			>
				<div className="size-[3vw] h-full ">
					<img src={assets.order_icon} alt="" />
				</div>
				<p className="text-[1.3vw]  ">
					<span>List Items</span>
				</p>
			</NavLink>
			<NavLink
				to="order"
				className="focus:bg-orange-100 flex gap-2  border-black items-center border-b-2   p-[1vw]"
			>
				<div className="size-[3vw] h-full">
					<img src={assets.order_icon} alt="" />
				</div>
				<p className="text-[1.3vw]  ">
					<span>Order Items</span>
				</p>
			</NavLink>
		</div>
	);
};

export default Sidebar;
