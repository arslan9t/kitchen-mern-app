import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext.jsx";

const Items = ({ all }) => {
	const { _id, price, name, image, description } = all;
	const { cartItems, addToCart, removeFromCart, url } =
		useContext(StoreContext);
	const [cart, setCart] = useState(cartItems);
	return (
		<div className="p-[1vw] rounded  hover:shadow-amber-500 shadow-md relative max-w-[22vw] cursor-pointer  ">
			<div>
				<img className="rounded" src={image} alt="" />
			</div>
			<div className="p-[1vw]">
				<div className="flex justify-between pt-2 pb-2">
					<p className="font-bold text-[1vw]">{name}</p>
					<img className="h-[1vw]" src={assets.rating_starts} alt="" />
				</div>

				<p className="text-zinc-500 pb-2 text-[1vw] whitespace-nowrap text-ellipsis ">
					{description}
				</p>
				<p className="text-red-600 text-[1vw]">${price}</p>
			</div>
			<div className="absolute top-[13.2vw] right-[2vw] bg-white rounded-3xl">
				{!(cart[_id] > 0) ?
					<img
						onClick={() => addToCart(_id)}
						className="h-[2vw]"
						src={assets.add_icon_white}
						alt=""
					/>
				:	<div className="flex items-center gap-[0.3vw] p-[0.2vw] ">
						<img
							onClick={() => removeFromCart(_id)}
							className="h-[2vw] border-[0.3vw] border-red-500 rounded-full"
							src={assets.add_icon_white}
							alt=""
						/>
						<p className="text-orange-700 text-[1vw]">{cartItems[_id]}</p>
						<img
							onClick={() => addToCart(_id)}
							className="h-[2vw] border-[0.3vw] border-green-500 rounded-full"
							src={assets.add_icon_white}
							alt=""
						/>
					</div>
				}
			</div>
		</div>
	);
};

export default Items;
