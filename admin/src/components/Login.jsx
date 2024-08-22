import axios from "axios";
import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext.jsx";

const Login = () => {
	const { setToken, url } = useContext(StoreContext);
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const onChangeHandler = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setData({ ...data, [name]: value });
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const newUrl = url + "/api/admin/login";
		const response = await axios.post(newUrl, { data: data });

		if (response.data.success) {
			setToken(response.data.token);
			localStorage.setItem("adminToken", response.data.token);
			setData({});
		} else {
			alert(response.data.message);
		}
	};

	return (
		<div className="grid place-content-center w-[100vw] h-[100vh] rounded-2xl">
			<div className="w-[270px] bg-slate-700 p-5 rounded-lg ">
				<div className=" flex flex-col gap-4 p-4 items-center">
					<h1 className="text-white text-[20px] font-bold">Admin Login</h1>
					<form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
						<input
							className="p-2 rounded-lg border-2"
							type="email"
							name="email"
							value={data.email}
							onChange={onChangeHandler}
							placeholder="Email"
							required
						/>
						<input
							className="p-2 rounded-lg border-2"
							type="password"
							name="password"
							value={data.password}
							onChange={onChangeHandler}
							placeholder="Password"
							required
						/>
						<button
							type="submit"
							className="block p-2 rounded-lg bg-orange-500"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
