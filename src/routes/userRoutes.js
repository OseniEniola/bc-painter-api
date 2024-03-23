const {Router} = require('express');
const userController = require('../controllers/userController.ts')
const router = Router();

router.get('/',(req,res) => {
   userController.getUsers()
})


module.exports = router;
