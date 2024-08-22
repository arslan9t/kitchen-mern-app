import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
const list = ({ url }) => {
	const [list, setList] = useState([]);

	const fetchList = async () => {
		const response = await axios.get(`${url}/api/food/list`);
		if (response.data.success) {
			setList(response.data.data);
			console.log(response.data.data);
		} else {
			toast.error(response.data.message);
		}
	};
	const remove = async (id) => {
		const res = await axios.post(`${url}/api/food/remove`, { id: id });
		if (res.data.success) {
			toast(res.data.message);
		} else {
			toast.error(res.data.message);
		}
		fetchList();
	};

	useEffect(() => {
		fetchList();
	}, []);

	return (
		<div className="w-5/6 px-[3vw] py-[1vw]">
			<h1 className=" text-[3vw]   font-bold">All Foods List</h1>
			<div className="lg:text-[19px]   md:text-sm  text-[10px] flex flex-col gap-4 overflow-x-scroll no-scrollbar">
				<div className="md:p-3 p-[5px] text-slate-800 grid-layout-md gap-3  border-2 border-slate-500 ">
					<p>Items</p>
					<p>Title</p>
					<p>Description</p>
					<p>Price</p>
					<p>Remove</p>
				</div>
				<div className="flex flex-col border border-slate-500  ">
					{list.map((item, index) => {
						return (
							<div
								key={index}
								className="md:p-3 grid-layout-md gap-3 p-2 border-b-2 items-center "
							>
								<div className="">
									<img
										className="w-20"
										src={`${url}/images/` + item.image}
										alt=""
									/>
								</div>
								<p>{item.name}</p>
								<p>{item.description}</p>
								<p>${item.price}</p>

								<div>
									<p
										className="cursor-pointer"
										onClick={() => {
											remove(item._id);
										}}
									>
										<RxCross1 />{" "}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default list;
