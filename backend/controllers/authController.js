const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const createUser = await user.create({ email, password: hashedPassword });
        res.status(200).json({
            message: "User registered successfully",
            user: createUser
        });

    } catch (error) {
        console.log("Error registering user", error)
        res.status(400).json({ message: "Error registering user" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;


        const userFound = await user.findOne({ where: { email } });

        if (!userFound) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.log("Error logging in", error);

        res.status(500).json({ message: "Error logging in", error });
    }
};
