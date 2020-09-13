const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")

const pool = require("../../db");

router.get("/", async(req, res) => {
    try {
        const items = await pool.query("SELECT item_id, item_name, created_at FROM items ORDER BY created_at DESC");
        if (items.rows.length === 0) throw Error("No items");

        res.status(200).json(items.rows);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.post("/", auth, async(req, res) => {
    const { item_name } = req.body;

    try {
        const item = await pool.query(
            "INSERT INTO items (item_name) VALUES ($1) RETURNING *",
            [item_name]
          );
        
        if (item.rows.length === 0) throw Error("Something went wrong saving the item");

        res.status(200).json(item.rows[0])

    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.delete("/:id", auth, async(req, res) => {
    try {
        const { id } = req.params;

        const item = await pool.query(
            "SELECT * FROM items WHERE item_id = $1",
            [id]
        );
        if (item.rows.length === 0) throw Error("No item found");


        const deleteItem = await pool.query(
            "DELETE FROM items WHERE item_id = $1 RETURNING *",
            [id]
        );
        if (deleteItem.rows.length === 0) throw Error("Something went wrong while trying to delete the item");
    
        res.status(200).json("Item was deleted");
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = router;