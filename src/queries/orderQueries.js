const getAllOrders ="SELECT * from orders";


const createNewOrder= "INSERT INTO orders(address,color,color_id,paint_used,order_status,painter_id) VALUES ($1,$2,$3,$4,$5,$6)"

const getOrderByPainterId = "SELECT * from orders where painter_id= $1"

const getOrderById = "SELECT * from orders where id = $1;"
const updateOrderPaintQuantity = "UPDATE  orders set paint_used = $1; where id = $1 and painter_id = $2"

const completeOrderPaintQuantity = "UPDATE orders set paint_used = $1, order_status = 'COMPLETED' where id = $2;"


module.exports = {createNewOrder,
    updateOrderPaintQuantity,
    getOrderById,
    completeOrderPaintQuantity,
    getOrderByPainterId,
    getAllOrders
}
