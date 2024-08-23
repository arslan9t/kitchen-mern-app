import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import validator from "validator";
import adminModel from "../modals/admin.js";

const createToken = (id) => {
	return jwt.sign({ id }, process.env.jwt_secret);
};

const adminRegister = async (req, res) => {
	try {
		const { email, password, pin } = req.body.data;
		if (pin !== process.env.PIN) {
			return res.json({ success: false, message: "Invalid Pin" });
		}
		const exist = await adminModel.findOne({ email: email });
		if (exist) {
			return res.json({ success: false, message: "Email Already Exists" });
		}
		if (!validator.isEmail(email)) {
			return res.json({ success: false, message: "Invalid Email" });
		}

		if (password.length < 8) {
			return res.json({
				success: false,
				message: "Password should contain at least 8 Characters",
			});
		}
		const salt = await bcrypt.genSalt(10);
		const hashpass = await bcrypt.hash(password, salt);

		const adminData = new adminModel({
			email: email,
			password: hashpass,
		});

		await adminData.save();

		res.json({ success: true, message: "Admin Added" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Not working" });
	}
};

const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body.data;
		const adminData = await adminModel.findOne({ email: email });
		if (!adminData) {
			return res.json({
				success: false,
				message: "Admin does not exists",
			});
		}
		const token = createToken(adminData._id);
		const match = await bcrypt.compare(password, adminData.password);
		if (match) {
			return res.json({ success: true, token });
		}
		res.json({ success: false, message: "Invalid Credentials" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Not working" });
	}
};

export { adminLogin, adminRegister };
