import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets.js";
import { StoreContext } from "../context/StoreContext.jsx";

const Navbar = ({ setToggle }) => {
	const { getTotal, token, setToken } = useContext(StoreContext);
	const [vis, setVis] = useState(true);

	const navigate = useNavigate();

	const logOut = () => {
		setToken("");
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<nav className="shadow-lg w-full h-[7vw] relative ">
			<div className="flex justify-between h-full items-center ">
				<div>
					<h1 className="mx-[2vw] text-[3.5vw] font-bold text-orange-700 items-center ">
						<Link to="/">
							<img src={assets.logo} alt="" className="w-[14vw]" />
						</Link>
					</h1>
				</div>

				<ul className="flex gap-[2vw]">
					<li className="hover:text-orange-700 text-[1.3vw]  cursor-pointer">
						<a href="/">Home</a>
					</li>
					<li className="hover:text-orange-700 text-[1.3vw] cursor-pointer">
						<a href="/#menu"> Menu </a>
					</li>
					<li className="hover:text-orange-700 text-[1.3vw] cursor-pointer">
						<a href="#dnlds"> Mobile-App </a>
					</li>
					<li className="hover:text-orange-700 text-[1.3vw] cursor-pointer">
						<a href="#contact"> Contact Us </a>
					</li>
				</ul>
				<div className="flex gap-[1vw] items-center mx-[2vw]">
					<div className="relative ">
						<Link to="/cart" className="flex  ">
							<FaShoppingCart className=" text-orange-700 text-[1.4vw]" />
						</Link>
						{getTotal() ? (
							<div
								className="absolute h-[1vw] w-[1vw] 
								border-[0.2vw]  border-white bg-red-700 rounded-full 
							top-[-0.4vw] right-[-0.5vw] text-white text-[10px] grid place-content-center "
							></div>
						) : (
							""
						)}
					</div>
					{token ? (
						<div>
							<div className=" text-orange-700 p-[0.2vw] cursor-pointer rounded-full hover:text-white hover:bg-orange-700 flex gap-0.5">
								<CgProfile
									onClick={() => setVis((prev) => !prev)}
									className="size-[2vw] "
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

								<hr className="w-[6vw] h-[1.3px] bg-black" />
								<div className="flex items-center gap-1">
									<IoBagHandle />
									<Link to="/myorder">
										<p className="cursor-pointer">Order</p>
									</Link>
								</div>
							</div>
						</div>
					) : (
						<button
							onClick={() => setToggle((prev) => !prev)}
							className=" border text-orange-700 border-orange-700 px-[1vw] py-[0.5vw] rounded-3xl hover:text-white hover:bg-orange-700"
						>
							<p className="text-[1vw]">Login</p>
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
