import { open } from "out-url";
import orderModel from "../modals/order.js";
import userModel from "../modals/user.js";
import { capturePayment, createOrder } from "../services/paypal.js";
const placeOrder = async (req, res) => {
	try {
		const newOrder = new orderModel({
			userId: req.body.userId,
			items: req.body.items,
			amount: req.body.amount,
			address: req.body.address,
		});
		await newOrder.save();

		// console.log(newOrder);
		let info = {
			intent: "CAPTURE",
			purchase_units: [
				{
					amount: {
						currency_code: "USD",
						value: req.body.amount,
						breakdown: {
							item_total: {
								currency_code: "USD",
								shipping: "2.00",
								value: req.body.amount,
							},
						},
					},
				},
			],

			application_context: {
				return_url:
					process.env.BASE_URL +
					`/api/order/complete-order/${newOrder._id}/${newOrder.userId}`,
				cancel_url:
					process.env.BASE_URL +
					`/api/order/cancel-order/${newOrder._id}/${newOrder.userId}`,
				shipping_preference: "NO_SHIPPING",
				user_action: "PAY_NOW",
				brand_name: "Kitchen",
			},
		};

		const items = req.body.items.map((item) => ({
			name: item.name,
			description: item.description,
			quantity: item.quantity,
			unit_amount: {
				currency_code: "USD",
				value: item.price,
			},
		}));
		items.push({
			name: "Delivery price",
			description: "Delivery Charges",
			quantity: 1,
			unit_amount: {
				currency_code: "USD",
				value: "2.00",
			},
		});
		info.purchase_units[0].items = items;
		const nwUrl = await createOrder(info);
		await open(newUrl);
	} catch (error) {
		console.log(error);
	}
};

const successPage = async (req, res) => {
	try {
		await capturePayment(req.query.token);
		await orderModel.findByIdAndUpdate(req.params.id, { payment: true });
		await userModel.findByIdAndUpdate(req.params.userId, { cartItems: {} });
		res.redirect("https://kitchen-frontend.onrender.com/");
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

const cancelPage = async (req, res) => {
	await orderModel.findByIdAndDelete(req.params.id);
	res.redirect("https://kitchen-frontend.onrender.com/order");
};

const orderPage = async (req, res) => {
	const data = await orderModel.find({ userId: req.body.userId });
	return res.json({ success: true, data: data });
};

const loadOrder = async (req, res) => {
	try {
		const data = await orderModel.find({});
		res.json({ success: true, data: data });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

const loadStatus = async (req, res) => {
	try {
		await orderModel.findByIdAndUpdate(req.body.orderId, {
			status: req.body.status,
		});
		res.json({ success: true, message: "Status Changed" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

export {
	cancelPage,
	loadOrder,
	loadStatus,
	orderPage,
	placeOrder,
	successPage,
};
