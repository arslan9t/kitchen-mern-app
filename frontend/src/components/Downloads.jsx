import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Downloads = () => {
	return (
		<div className="p-[5vw] flex flex-col items-center" id="dnlds">
			<h1 className="text-[3vw] font-bold">For Better Experience Download</h1>
			<h1 className="text-[3vw] font-bold">Tomato App</h1>
			<div className="flex p-[1vw]">
				<img className="h-[4vw] w-[8]" src={assets.play_store} alt="" />
				<img className="h-[4vw] w-[8]" src={assets.app_store} alt="" />
			</div>
		</div>
	);
};

export default Downloads;
