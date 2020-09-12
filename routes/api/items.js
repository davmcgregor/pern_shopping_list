const express = require("express")
const router = express.Router()

const pool = require("../../db");

//@route GET api/items

//@desc Get All Items

//@access Public

router.get('/', async(req, res) => {
    try {
        const items = await pool.query("SELECT item_id, item_name, created_at FROM items ORDER BY created_at DESC");

        res.json(items.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.post('/', async(req, res) => {
    try {
        const { item_name } = req.body;
        const newItem = await pool.query(
            "INSERT INTO items (item_name) VALUES ($1) RETURNING *",
            [item_name]
          );
        
          res.json(newItem.rows[0])

    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;