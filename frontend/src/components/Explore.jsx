import React from "react";
import { menu_list } from "../assets/frontend_assets/assets";
const Explore = ({ category, setCategory }) => {
	return (
		<div className="mt-[2vw] mb-[2vw] h-[25vw] w-full p-[2vw] flex flex-col">
			<h1 className=" text-[3vw] font-bold ">Explore Our Menu</h1>
			<p className="w-[60vw] mt-[1.5vw] text-[1vw] ">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, non
				repellendus. Minus, at assumenda temporibus obcaecati, officiis rem
				rerum enim architecto recusandae illo quia iure repudiandae
			</p>
			<div className="mt-[2vw] h-auto overflow-x-auto no-scrollbar cursor-pointer">
				<div className="w-[80vw] flex gap-[1vw]">
					{menu_list.map((data, index) => {
						return (
							<div
								onClick={() =>
									setCategory((prev) =>
										prev === data.menu_name ? "all" : data.menu_name,
									)
								}
								key={index}
								className="w-full"
							>
								<div className="flex flex-col items-center w-[7vw] ">
									<img
										className={
											category === data.menu_name
												? " border-[0.2vw] rounded-full shadow  shadow-orange-500 "
												: "border-[0.2vw] rounded-full "
										}
										src={data.menu_image}
										alt=""
									/>
									<p className="text-[1vw]">{data.menu_name}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Explore;
