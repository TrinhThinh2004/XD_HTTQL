const express = require('express')

const router = express.Router()
const productController = require('../controller/products.controller')
const {
  upload
} = require('../middleware/multer')
const { verifyToken, checkRole } = require('../middleware/middleware')

router.get('/', productController.getAllProducts)
router.post('/create', verifyToken, checkRole(['admin', 'manager']), upload, productController.createProduct)
router.put('/edit/:id', verifyToken, checkRole(['admin', 'manager']), upload, productController.editProduct)
router.delete('/delete/:id', verifyToken, checkRole(['admin']), productController.deleteProduct)

module.exports = router