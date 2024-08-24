import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../assests/admin_assets/assets";

const Add = ({ url }) => {
	const [image, setImage] = useState(false);

	const [data, setData] = useState({
		name: "",
		price: "",
		category: "Salad",
		description: "",
	});

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setData((prev) => ({ ...data, [name]: value }));
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("description", data.description);
		formData.append("price", Number(data.price));
		formData.append("category", data.category);
		formData.append("image", image);

		const res = await axios.post(`${url}/api/food/add`, formData);
		if (res.data.success && image) {
			setData({
				name: "",
				price: "",
				category: "Salad",
				description: "",
			});
			setImage(false);
			toast("Food Added");
		} else {
			toast.error("fuck");
		}
	};

	return (
		<div className="w-5/6 flex">
			<form
				className="lg:text-[19px]  text-slate-900 px-[3vw] py-[1vw] flex flex-col gap-[2vw] text-[12px] "
				onSubmit={onSubmitHandler}
			>
				<div className="relative">
					<p className="mb-2 text-[3vw] font-bold">Upload File</p>
					<label htmlFor="image">
						<img
							className="lg:w-40  cursor-pointer w-24 "
							src={image ? URL.createObjectURL(image) : assets.upload_area}
							alt=""
						/>
					</label>
					<input
						onChange={(e) => {
							setImage(e.target.files[0]);
						}}
						type="file"
						name="image"
						id="image"
						className="opacity-0 absolute top-2"
						required
					/>
				</div>
				<div>
					<p className="mb-2">Product Name</p>
					<input
						onChange={onChangeHandler}
						value={data.name}
						className="lg:w-full py-1 px-2 border-2  border-gray-500"
						type="text"
						name="name"
						required
					/>
				</div>
				<div>
					<p>Product Description</p>
					<textarea
						onChange={onChangeHandler}
						value={data.description}
						className="lg:w-full py-1 px-2 border-2 border-gray-500"
						rows={6}
						name="description"
						required
					/>
				</div>
				<div className="lg:flex lg:gap-4 lg:items-center ">
					<div className="mb-3">
						<p>Price</p>
						<input
							name="price"
							onChange={onChangeHandler}
							value={data.price}
							placeholder="$20"
							className="lg:w-full py-1 px-2 border-2 border-gray-500"
							type="number"
							required
						/>
					</div>
					<div className="mb-3">
						<p>Category</p>
						<select
							className=" py-[5.5px] px-2 cursor-pointer border-2 border-gray-500"
							name="category"
							required
							onChange={onChangeHandler}
						>
							<option value="Salad">Salad</option>
							<option value="Rolls">Rolls</option>
							<option value="Deserts">Deserts</option>
							<option value="Sandwich">Sandwich</option>
							<option value="Cake">Cake</option>
							<option value="Pure Veg">Pure Veg</option>
							<option value="Pasta">Pasta</option>
							<option value="Noodles">Noodles</option>
						</select>
					</div>
				</div>

				<button className=" py-1 px-3 cursor-pointer lg:w-20 w-14 bg-black text-white">
					Add
				</button>
			</form>
		</div>
	);
};

export default Add;
