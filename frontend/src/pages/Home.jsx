import React, { useState } from "react";
import Explore from "../components/Explore";
import Food from "../components/Food";
import Header from "../components/Header";

const Home = () => {
	const [category, setCategory] = useState("all");
	return (
		<div>
			<Header />
			<Explore category={category} setCategory={setCategory} />
			<Food category={category} />
		</div>
	);
};

export default Home;
