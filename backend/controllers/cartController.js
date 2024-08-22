import userModel from "../modals/user.js";

// Add items

const addToCart = async (req, res) => {
	try {
		let userData = await userModel.findById(req.body.userId);
		let cartItems = await userData.cartItems;
		if (!cartItems[req.body.itemId]) {
			cartItems[req.body.itemId] = 1;
		} else {
			cartItems[req.body.itemId] += 1;
		}
		await userModel.findByIdAndUpdate(req.body.userId, { cartItems });
		res.json({ success: true, message: "Added To Cart" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

// Remove item

const removeFromCart = async (req, res) => {
	try {
		let userData = await userModel.findById(req.body.userId);
		let cartItems = await userData.cartItems;
		if (cartItems[req.body.itemId] > 0) {
			cartItems[req.body.itemId] -= 1;
		}
		if (cartItems[req.body.itemId] === 0) {
			delete cartItems[req.body.itemId];
		}
		await userModel.findByIdAndUpdate(req.body.userId, { cartItems });
		res.json({ success: true, message: "Removed From Cart" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

// Fetch user cart data

const getCart = async (req, res) => {
	try {
		let userData = await userModel.findById(req.body.userId);
		let cartItems = await userData.cartItems;
		res.json({ success: true, cartItems });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

export { addToCart, getCart, removeFromCart };
