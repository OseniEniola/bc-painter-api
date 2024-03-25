const pool = require("../../dbConfig")
const inventoryQueries = require("../queries/inventoryQueries")



const getAllInventories = (req, res) => {
    pool.query(inventoryQueries.getInventories, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error occurred" });
        }
        let message = { status: 200, data: result.rows };
        res.status(200).json(message);
    });
};


const createInventory = async (req, res) => {
    try {
        const { color, quantity } = req.body;
        if (!color) {
            return res.status(400).json({ message: "Color is required" });
        }

        if (!quantity) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        const data = await pool.query(inventoryQueries.getInventoryByName, [color]);

        if (data.rows.length > 0) {
            return res.status(400).json({ message: "Color already exists. Use the update option to update quantity" });
        }

        const result = await pool.query(inventoryQueries.createNewInventory, [color, quantity]);
        let message = { status: 200, data: result.rows };
        res.status(200).json(message);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Error occurred" });
    }
}


const updateInventory = async (req, res) => {
    try {
        const { color_id, quantity } = req.body;
        if (!color_id) {
            return res.status(400).json({ message: "Color is required" });
        }
        if (!quantity) {
            return res.status(400).json({ message: "Quantity is required" });
        }
        const data = await pool.query(inventoryQueries.getInventoryByID, [color_id]);
        if (data.rows.length < 1) {
            return res.status(400).json({ message: "Color does not exist in the inventory" });
        }
        await pool.query(inventoryQueries.updatePaintInventory, [quantity, color_id]);
        return res.status(200).json({ status: 200, message: "Inventory updated successfully" });
    } catch (err) {
        console.error("Error occurred:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {createInventory,updateInventory,getAllInventories}
