const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { 
	getArrivalProducts, createArrivalProduct, updateArrivalProduct, deleteArrivalProduct  
} = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getArrivalProducts)

router.post(
    '/',
    [
		check('productExpense', 'El producto del cual es esta recibiendo es obligatorio'),
        check('units', 'Las unidades del producto es obligatorio').not().isEmpty(),
        check('description', 'La descripción del producto es obligatorio').not().isEmpty(),
        validarCampos
    ],
	createArrivalProduct
);

router.put('/', updateArrivalProduct)

router.delete('/', deleteArrivalProduct)

module.exports = router;