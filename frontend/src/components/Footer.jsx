import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
	const adminPanel = () => {
		window.open("https://kitchen-admin-74u3.onrender.com");
	};
	return (
		<div className="h-auto bg-slate-800 p-[3vw] " id="contact">
			<div className=" flex justify-evenly flex-wrap gap-[3vw] ">
				<div className="w-[20vw]">
					<h1 className="text-orange-700 text-[3.5vw] font-bold">KITCHEN</h1>
					<p className="text-white mt-[1vw] text-[1vw]">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. At error
						distinctio praesentium voluptate dolores, neque omnis sint ab
						exercitationem, facilis et, maiores vero hic repudiandae facere.
						Corporis, facere! Ipsum, molestias.
					</p>
					<div className="flex gap-[1vw] mt-[1vw]">
						<img className="h-[2vw]" src={assets.facebook_icon} alt="" />
						<img className="h-[2vw]" src={assets.linkedin_icon} alt="" />
						<img className="h-[2vw]" src={assets.twitter_icon} alt="" />
					</div>
				</div>
				<div className="text-white flex flex-col gap-[3vw] w-[20vw]">
					<h1 className="text-[3.2vw] font-bold">Company</h1>
					<div>
						<ul className="text-[1vw]">
							<li className="hover:text-orange-700  cursor-pointer">
								<a href="/">Home</a>
							</li>
							<li className="hover:text-orange-700 cursor-pointer">
								<a href="/menu"> Menu </a>
							</li>
							<li className="hover:text-orange-700 cursor-pointer">
								<a href=""> Mobile-App </a>
							</li>
							<li className="hover:text-orange-700 cursor-pointer">
								<a href="/contact"> Contact Us </a>
							</li>
							<li
								onClick={adminPanel}
								className="hover:text-orange-700 cursor-pointer"
							>
								Admin panel
							</li>
						</ul>
					</div>
				</div>
				<div className="text-white flex flex-col gap-[3vw] w-[20vw]">
					<h1 className="font-bold text-[3vw] ">Get in touch.</h1>
					<ul className="text-[1vw]">
						<li>Phone : +91 7894561236</li>
						<li>Email : kitchen@gmail.com</li>
					</ul>
				</div>
			</div>
			<hr className="bg-white my-[3vw]" />
			<p className="text-white flex justify-center text-[1.5vw]">
				<span>Copyright 2024 @ kitchen.com. ALL RIGHTS RESERVED</span>
			</p>
		</div>
	);
};

export default Footer;
