require('dotenv').config()
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth")

const pool = require("../../db");

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        email
      ]);

      if (!user.rows.length) throw Error('User does not exist');
  
      const isMatch = await bcrypt.compare(password, user.rows[0].user_password);
      if (!isMatch) throw Error('Invalid credentials');
  
      const token = jwt.sign({  id: user.rows[0].user_id }, process.env.jwtSecret, { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');
  
      res.status(200).json({
        token,
        user: {
            id: user.rows[0].user_id,
            name: user.rows[0].user_name,
            email: user.rows[0].user_email
        }
    });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  });

router.post("/register", async(req, res) => {
    const { email, name, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" })
    }

    try {

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length) throw Error ("User already exists");
        

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');

        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error('Something went wrong hashing the password');

        const newUser = await pool.query( 
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hash]
        );

        const token = jwt.sign({ id: newUser.rows[0].user_id }, process.env.jwtSecret, {
            expiresIn: 3600
          });

        res.status(200).json({
            token,
            user: {
                id: newUser.rows[0].user_id,
                name: newUser.rows[0].user_name,
                email: newUser.rows[0].user_email
            }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/user', auth, async (req, res) => {
    try {
        const user = await pool.query("SELECT user_id, user_name, user_email, registered_at FROM users WHERE user_id = $1", [
            req.user.id
        ]);
        if (!user.rows.length) throw Error('User does not exist');
        res.json(user.rows[0]);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  });

module.exports = router;