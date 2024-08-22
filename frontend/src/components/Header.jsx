import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Header = () => {
	return (
		<div className=" w-full h-auto text-white mt-[1vw]">
			<div className="relative w-full">
				<div className="p-[1.5vw] ">
					<img className="rounded-[2vw]" src={assets.header_img} alt="" />
				</div>
				<div className="absolute top-[13vw] left-[16vw] animate-fade">
					<h1 className="text-[6vw] font-bold tracking-tighter mb-[-3vw]">
						Order your
					</h1>
					<h1 className=" text-[6vw] font-bold tracking-tighter ">
						Favourite food here
					</h1>
					<p className="w-[50vw] text-[1.1vw] pl-[0.5vw]">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quasi,
						accusamus, explicabo nihil fugiat modi consectetur fuga quibusdam
						repellat sed, unde pariatur! Aliquid accusamus ducimus illo enim eum
						itaque temporibus?
					</p>
					<div className="pl-[0.5vw] p-[1vw] flex items-center">
						<button className="border p-[0.7vw] text-white   rounded-3xl hover:text-orange-500 hover:bg-white">
							<p className="text-[1vw]">View More</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
