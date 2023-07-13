const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getProductExpense, createProductExpense, updateProductExpense, deleteProductExpense  } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getProductExpense)

router.post(
    '/',
    [
        check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('productType', 'El nombre de tipo de producto es obligatorio').not().isEmpty(),
        check('cost', 'El costo del producto es obligatorio').not().isEmpty(),
        check('units', 'Las unidades del producto es obligatorio').not().isEmpty(),
        check('description', 'La descripción del producto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createProductExpense
);

router.put('/', updateProductExpense)

router.delete('/', deleteProductExpense)

module.exports = router;