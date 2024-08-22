import fs from "fs";
import foodModel from "../modals/food.js";
const addFood = async (req, res) => {
	const food = new foodModel({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category,
		image: req.file.filename,
	});
	try {
		await food.save();
		res.json({ success: true, message: "food added" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};
const listFood = async (req, res) => {
	try {
		const food = await foodModel.find({});
		res.json({ success: true, data: food });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "error" });
	}
};

const removeFood = async (req, res) => {
	try {
		const food = await foodModel.findById(req.body.id);
		if (food) {
			fs.unlink(`uploads/${food.image}`, () => {});
			await foodModel.findByIdAndDelete(req.body.id);
			res.json({ success: true, message: "Deleted" });
		} else {
			res.json({ success: false, message: "Not Found" });
		}
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Not Deleted" });
	}
};

export { addFood, listFood, removeFood };
