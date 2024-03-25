const {Router} = require('express');
const userController = require('../controllers/userController.ts')

const router = Router();

router.get("/",userController.getUsers)

router.get("/painters",userController.getAllPainters)

router.put("/update",userController.updateUser)

router.post("/create",userController.createNewUser)

router.post("/login",userController.login)

module.exports = router;
