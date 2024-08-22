import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { assets } from "../assests/admin_assets/assets";
import { StoreContext } from "../context/StoreContext.jsx";

const Navbar = () => {
	const { setToken } = useContext(StoreContext);
	const [vis, setVis] = useState(true);

	const navigate = useNavigate();

	const logOut = () => {
		setToken("");
		localStorage.removeItem("adminToken");
		navigate("/");
	};
	return (
		<div className="flex  items-center justify-between p-[1.5vw]">
			<img className="w-[14vw] " src={assets.logo} alt="" />
			<div>
				<div>
					<div className=" text-orange-700 p-[0.2vw] cursor-pointer rounded-full hover:text-white hover:bg-orange-700 flex gap-0.5">
						<CgProfile
							onClick={() => setVis((prev) => !prev)}
							className="size-[2.5vw] "
						/>
					</div>
					<div
						className={
							vis
								? "hidden"
								: "visible absolute right-[3vw] z-10 border border-orange-700 bg-orange-200 rounded px-5 py-2 text-[1vw] "
						}
					>
						<div className="flex items-center gap-1">
							<TbLogout />
							<p
								className=" cursor-pointer"
								onClick={() => {
									logOut();
								}}
							>
								Logout
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
