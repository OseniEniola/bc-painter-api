const pool = require("../../dbConfig")
const userQueries =  require("../queries/userQueries")
const bcrypt = require("bcrypt")
const getUsers = (req, res) => {
    pool.query(userQueries.getUsers, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error occurred" });
        }
        let message = { status: 200, data: result.rows };
        res.status(200).json(message);
    });
};

const getAllPainters = (req, res) => {
    pool.query(userQueries.getPainters, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error occurred" });
        }
        let message = { status: 200, data: result.rows };
        res.status(200).json(message);
    });
};

const createNewUser = async (req, res) => {
    try {
        const { first_name, last_name, email, role, password, phone } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if user with the email already exists
        const existingUser = await pool.query(userQueries.checkIfUserWithEmailExist, [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User with the email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const user = {
            first_name,
            last_name,
            email,
            role,
            password: hashedPassword,
        };

        // Insert user into the database
        await pool.query(userQueries.createUser, [first_name, last_name, email, role, phone, hashedPassword]);

        // Send success response
        res.status(201).json({ status: 201, message: "User created successfully", data: user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const {user_id, first_name, last_name, email, role, phone } = req.body;



        // Check if user with the userid exists
        const existingUser = await pool.query(userQueries.getUserByUserId, [user_id]);
        if (existingUser.rows.length < 1) {
            return res.status(400).json({ message: "User with the id does not exist" });
        }

        // Create user object
        const user = {
            first_name : first_name || existingUser.rows[0].first_name,
            last_name: last_name || existingUser.rows[0].last_name,
            email: email || existingUser.rows[0].email,
            role: role || existingUser.rows[0].role,
            phone: phone || existingUser.rows[0].phone
        };

        // Update user into the database
        await pool.query(userQueries.updateUserDetails, [first_name, last_name, email, role, phone,user_id]);

        // Send success response
        res.status(201).json({ status: 201, message: "User updated successfully", data: user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    // Query the database to get user data by email
    const data = await pool.query(userQueries.getUserByEmail, [email]);
    // Check if user with the provided email exists
    if (data.rows.length < 1) {
        return res.status(400).json({ message: "User with email does not exist" });
    }
    // Compare the provided password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, data.rows[0].password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Email and password do not match" });
    }
    // If email and password match, send user data in the response
    res.status(200).json({ status: 200, data: data.rows[0] });
}

module.exports = {
    getUsers,
    createNewUser,
    login,
    getAllPainters,
    updateUser
}
