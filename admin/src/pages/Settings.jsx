import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext.jsx";

const Settings = () => {
	const { url } = useContext(StoreContext);
	const [data, setData] = useState({
		email: "",
		password: "",
		pin: "",
	});

	const onChangeHandler = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setData({ ...data, [name]: value });
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const response = await axios.post(url + "/api/admin/register", {
			data: data,
		});
		if (response.data.success) {
			setData({
				email: "",
				password: "",
				pin: "",
			});
			toast(response.data.message);
		} else {
			alert(response.data.message);
		}
	};

	return (
		<div className="px-[3vw] py-[1vw] flex flex-col gap-[1vw] w-5/6">
			<h1 className=" text-[3vw]  font-bold">Create New Admin</h1>
			<div className=" flex flex-col gap-[2vw] max-w-[20vw] ">
				<form
					onSubmit={onSubmitHandler}
					className="flex flex-col gap-[2vw] text-[1vw]"
				>
					<input
						className="p-[1vw] rounded border-2"
						type="email"
						name="email"
						onChange={onChangeHandler}
						value={data.email}
						placeholder="Email"
						required
					/>
					<input
						className="p-[1vw] rounded border-2"
						type="password"
						name="password"
						onChange={onChangeHandler}
						value={data.password}
						placeholder="Password"
						required
					/>
					<input
						className="p-[1vw] rounded border-2"
						type="password"
						name="pin"
						onChange={onChangeHandler}
						value={data.pin}
						placeholder="PIN"
						required
					/>
					<button
						type="submit"
						className="text-white block p-[0.5vw] rounded w-[10vw] bg-black"
					>
						Add
					</button>
				</form>
			</div>
		</div>
	);
};

export default Settings;
