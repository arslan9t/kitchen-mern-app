import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import foodModel from "../modals/food.js";

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addFood = async (req, res) => {
	try {
		const uniqueId = uuidv4();
		const result = await cloudinary.uploader.upload(req.file.path, {
			public_id: `mern_app/${uniqueId}`, // Organize uploads in a folder
			folder: "mern_app",
		});
		console.log(result.secure_url);
		const food = new foodModel({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			category: req.body.category,
			image: result.secure_url,
		});
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
