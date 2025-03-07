const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const { verifyToken } = require("../middleware/authMiddleware")


exports.signup = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        if (!email || !password) {
            res.status(400).json({ message: "Please provide email & password" })
        }
        const findUser = await user.findOne({
            where: {
                email: email
            }
        })
        if (!findUser) {
            const createUser = await user.create({ email, password: hashedPassword });
            res.status(200).json({
                message: "User registered successfully, try logging in",
                user: createUser
            });
        } else {
            res.status(400).json({
                message: "User exists already"
            });
        }

    } catch (error) {
        console.log("Error registering user", error)
        res.status(500).json({ message: "Error registering user" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Please provide email & password" })
        }

        const userFound = await user.findOne({ where: { email } });

        if (!userFound) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, { expiresIn: "2h" });
        const id = userFound.id

        res.status(200).json({
            message: "Login successful",
            token,
            id
        });

    } catch (error) {
        console.log("Error logging in", error);

        res.status(500).json({ message: "Error logging in", error });
    }

};



exports.logout = async (req, res) => {
    try {
        const { id, token } = req.body;
        if (!id || !token) {
            res.status(400).json({ message: "Please provide id" })
        }

        const checkValidUser = await user.findOne({ where: { id: id } });

        const checkTokenValid = await verifyToken(token);

        if (checkTokenValid && checkValidUser) {
            res.status(200).json({ message: "Logout successfull" })
        } else {
            res.status(400).json({ message: "Invalid credentials" })
        }
    } catch (error) {
        console.log("Error logging out: ", error);
        res.status(500).json({ message: "Error logging out", error })
    }
}