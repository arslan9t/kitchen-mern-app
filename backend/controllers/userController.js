import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../modals/user.js";

const createToken = (id) => {
	return jwt.sign({ id }, process.env.jwt_secret);
};

const register = async (req, res) => {
	const { username, email, password } = req.body;

	const exist = await userModel.findOne({ email: email });

	if (exist) {
		return res.json({
			success: false,
			message: "Already exists in the Database",
		});
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

	const newUser = await new userModel({
		username: username,
		email: email,
		password: hashpass,
	});
	try {
		const user = await newUser.save();
		const token = createToken(user._id);
		res.json({ success: true, token });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: "User does not exists ",
			});
		}
		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			return res.json({ success: true, message: "Invalid Credentials" });
		}
		const token = createToken(user._id);
		res.json({ success: true, token: token });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

export { login, register };
