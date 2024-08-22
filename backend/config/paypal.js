import paypal from "paypal-rest-sdk";

// Configure PayPal with your credentials
paypal.configure({
	mode: "sandbox", // Change to 'live' for production
	client_id: "YOUR_CLIENT_ID",
	client_secret: "YOUR_CLIENT_SECRET",
});

export default paypal;
