import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";

const Cart = ({ setToggle }) => {
	const { cartItems, addToCart, removeFromCart, token } =
		useContext(StoreContext);
	const { food_list, getTotal, url } = useContext(StoreContext);
	const navigate = useNavigate();

	return (
		<div className=" p-[3vw] flex flex-col  w-[80vw] m-auto h-[100vh] ">
			<div>
				<div className="grid grid-cols-6 gap-[1vw] m-[1vw] font-bold mx-auto border p-[1vw] text-slate-600 ">
					<p className="text-[2vw]">Items</p>
					<p className="text-[2vw]">Title</p>
					<p className="text-[2vw]">Price</p>
					<p className="text-[2vw]">Quantity</p>
					<p className="text-[2vw]">Total</p>
					<p className="text-[2vw]">Remove</p>
				</div>
				{food_list.map((item, index) => {
					if (cartItems[item._id] > 0) {
						return (
							<div
								key={index}
								className="grid grid-cols-6 gap-[1vw] m-[0.5vw] items-center "
							>
								<img
									className="w-[5vw]"
									src={url + "images/" + item.image}
									alt=""
								/>
								<p className="text-[1vw]">{item.name}</p>
								<p className="text-[1vw]">${item.price}</p>
								<p className="text-[1vw]">{cartItems[item._id]}</p>
								<p className="text-[1vw]">
									${cartItems[item._id] * item.price}
								</p>
								<img
									className="cursor-pointer h-[1vw]"
									onClick={() => {
										removeFromCart(item._id);
									}}
									src={assets.cross_icon}
									alt=""
								/>
							</div>
						);
					}
				})}
			</div>
			<div className="mt-[]">
				<button
					onClick={() => {
						if (!token) {
							setToggle((prev) => !prev);
						} else {
							navigate("/order");
						}
					}}
					className="p-[1vw] bg-orange-700 rounded text-white"
				>
					<p className="text-[1vw]"> Checkout </p>
				</button>
			</div>
		</div>
	);
};

export default Cart;
