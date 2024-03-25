const pool = require("../../dbConfig")
const orderQueries = require("../queries/orderQueries")
const inventoryQueries = require("../queries/inventoryQueries")


const getAllOrders = (req, res) => {
    pool.query(orderQueries.getAllOrders, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error occurred" });
        }
        let message = { status: 200, data: result.rows };
        res.status(200).json(message);
    });
};

const createOrder = async (req, res) => {
    try {
        const { address, color, color_id, painter_id } = req.body;

        if (!address) {
            return res.status(400).json({ message: 'Address is required' });
        }
        if (!color) {
            return res.status(400).json({ message: 'Paint Color is required' });
        }
        if (!painter_id) {
            return res.status(400).json({ message: 'Painter is required' });
        }

        const result = await pool.query(orderQueries.createNewOrder, [address, color, color_id, 0, 'PROCESSING', painter_id]);
        return res.status(200).json({ status: 200, data: result.rows });
    } catch (err) {
        console.error('An error occurred while creating order:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const completeOrder = async (req, res) => {
    try {
        const { order_id, painter_id, no_paint_used, color_id } = req.body;

        if (!order_id || !painter_id || !no_paint_used || !color_id) {
            return res.status(400).json({ message: "Order id, painter id, no_paint_used, and color id are required" });
        }

        const order = await pool.query(orderQueries.getOrderById, [order_id]);
        if (order.rows.length < 1) {
            return res.status(404).json({ message: "Order with the specified id does not exist" });
        }

        if (order.rows[0].painter_id !== painter_id) {
            return res.status(401).json({ message: "You are not authorized to complete this order" });
        }

        console.log(order.rows[0].color_id,color_id)
        if(order.rows[0].color_id != color_id){
            return res.status(400).json({ message: "Selected color and order do not match" });
        }

        await pool.query(orderQueries.completeOrderPaintQuantity, [no_paint_used, order_id]);
        const paint_result = await pool.query(inventoryQueries.getInventoryByID, [color_id]);
        console.log("paint_result", paint_result.rows[0]);

        const quantity = paint_result.rows.length > 0 ? paint_result.rows[0].quantity : 0;
        const newQuantity = quantity - no_paint_used;
        console.log("New quantity", newQuantity, quantity);

        await pool.query(inventoryQueries.updatePaintInventory, [newQuantity, color_id]);

        return res.status(200).json({ message: "Order completed successfully" });
    } catch (err) {
        console.error("An error occurred:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getOrderByPainterId = async (req, res) => {
    try {
        const { painter_id } = req.params;
        const result = await pool.query(orderQueries.getOrderByPainterId, [painter_id]);
        const message = { status: 200, data: result.rows };
        res.status(200).json(message);
    } catch (err) {
        console.error("An error occurred:", err);
        return res.status(500).json({ message: err.message });
    }
};



module.exports = {completeOrder,createOrder,getOrderByPainterId,getAllOrders}
