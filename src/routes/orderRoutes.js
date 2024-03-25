const {Router} = require("express")
const orderController = require("../controllers/orderController")

const router = Router();

router.get("/",orderController.getAllOrders)

router.post("/create",orderController.createOrder)

router.put("/complete",orderController.completeOrder)

router.get("/:painter_id",orderController.getOrderByPainterId)

module.exports = router;
