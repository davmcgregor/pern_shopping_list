const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs'); 

const pool = require("../../db");

router.post("/register", async(req, res) => {
    const { email, name, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json("Please enter all fields")
    }

    try {

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length) {
            return res.status(400).json("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');

        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error('Something went wrong hashing the password');

        const newUser = await pool.query( 
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hash]
        );

        res.status(200).json({
            user: {
                id: newUser.rows[0].user_id,
                name: newUser.rows[0].user_name,
                email: newUser.rows[0].user_email
            }
        });
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = router;