import axios from "axios";

async function generateAccessToken() {
	const response = await axios({
		url: process.env.PAYPAL_BASE_URL + "/v1/oauth2/token",
		method: "post",
		data: "grant_type=client_credentials",
		auth: {
			username: process.env.PAYPAL_CLIENT_ID,
			password: process.env.PAYPAL_SECRET,
		},
	});

	return response.data.access_token;
}

const createOrder = async (info) => {
	const accessToken = await generateAccessToken();

	const response = await axios({
		url: process.env.PAYPAL_BASE_URL + "/v2/checkout/orders",
		method: "post",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		},
		data: JSON.stringify(info),
	});
	return response.data.links.find((link) => link.rel === "approve").href;
};
const capturePayment = async (orderId) => {
	const accessToken = await generateAccessToken();

	const response = await axios({
		url: process.env.PAYPAL_BASE_URL + `/v2/checkout/orders/${orderId}/capture`,
		method: "post",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		},
	});

	return response.data;
};

export { capturePayment, createOrder };
