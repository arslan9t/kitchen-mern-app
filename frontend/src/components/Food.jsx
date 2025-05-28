import React, { useContext } from "react";
import Items from "../components/Items.jsx";
import { StoreContext } from "../context/StoreContext.jsx";
const Food = ({ category }) => {
	const { food_list } = useContext(StoreContext);

	return (
		<div id="menu">
			<h1 className="text-[3vw] font-bold mb-[1vw] p-[2vw]">
				Top dishes near you
			</h1>
			<div className="flex flex-wrap gap-[1vw] animate-fade justify-center ">
				{food_list?.map((item, index) => {
					if (category === "all" || category === item.category)
						return <Items key={index} all={item} />;
				})}
			</div>
		</div>
	);
};

export default Food;
