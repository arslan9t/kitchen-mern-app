import axios from "axios";
import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";

const Login = ({ setToggle }) => {
	const { url, token, setToken } = useContext(StoreContext);
	const [input, setInput] = useState("login");

	const [data, setData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const onChangeHandler = (e) => {
		const username = e.target.name;
		const value = e.target.value;
		setData({ ...data, [username]: value });
	};

	const login = async (e) => {
		e.preventDefault();
		let newUrl = url;

		if (input === "login") {
			newUrl += "api/user/login";
		} else {
			newUrl += "api/user/register";
		}

		const response = await axios.post(newUrl, data);

		if (response.data.success) {
			setToken(response.data.token);
			localStorage.setItem("token", response.data.token);
			setToggle(false);
		} else {
			alert(response.data.message);
		}
	};

	return (
		<div className="absolute top-[25vh] w-full h-auto bg-transparent rounded-2xl grid place-content-center cursor-pointer text-[1vw] ">
			<div className="max-w-[20vw] p-[1vw] rounded bg-white border border-red-800 shadow-2xl">
				<div className="flex justify-between p-[1.4vw] items-center">
					{input === "login" ?
						<h1 className="font-bold text-[1.7vw] ">Login</h1>
					:	<h1 className="font-bold text-[1.7vw] ">Sign Up</h1>}
					<img
						className="size-[1vw] cursor-pointer "
						onClick={() => setToggle(false)}
						src={assets.cross_icon}
						alt=""
					/>
				</div>
				<div className=" flex flex-col gap-[1vw] p-[1vw]">
					<form onSubmit={login} className="flex flex-col gap-[1vw]">
						{input === "login" ?
							""
						:	<input
								className="p-[0.5vw] rounded-lg border-2"
								type="text"
								name="username"
								value={data.username}
								required
								onChange={(e) => {
									onChangeHandler(e);
								}}
								placeholder="Username"
							/>
						}
						<input
							className="p-[0.5vw] rounded-lg border-2"
							type="email"
							name="email"
							value={data.email}
							placeholder="Email"
							required
							onChange={(e) => {
								onChangeHandler(e);
							}}
						/>
						<input
							className="p-[0.5vw] rounded-lg border-2"
							type="password"
							name="password"
							value={data.password}
							placeholder="Password"
							required
							onChange={(e) => {
								onChangeHandler(e);
							}}
						/>
						<button
							type="submit"
							className="block p-[0.5vw] rounded-lg bg-orange-700"
						>
							{input === "login" ? "Login" : "Create Account"}
						</button>
						<p>
							<input className="size-[1vw]" type="checkbox" required />
							By continuing, I agree to the terms of use & privacy policy
						</p>
					</form>
					{input === "login" ?
						<>
							<p>
								Create a new account?
								<span
									className="px-1 text-orange-700 cursor-pointer"
									onClick={() => setInput("sign")}
								>
									Sign up
								</span>
							</p>
						</>
					:	<>
							<p className="text-[1vw]">
								Already have an account?
								<span
									className="px-1 text-orange-700 cursor-pointer"
									onClick={() => setInput("login")}
								>
									Login
								</span>
							</p>
						</>
					}
				</div>
			</div>
		</div>
	);
};

export default Login;
