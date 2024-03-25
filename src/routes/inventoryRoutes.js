const {Router} = require("express")
const inventoryController = require("../controllers/inventoryController")

const router = Router();
router.get("/",inventoryController.getAllInventories)

router.put("/update",inventoryController.updateInventory)

router.post("/create",inventoryController.createInventory)

module.exports = router;
