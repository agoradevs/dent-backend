const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getProductExpense, createProductExpense, updateProductExpense, deleteProductExpense  } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
// router.use(validarJWT);

router.get('/', getProductExpense)

router.post(
    '/',
    [
        check('ProductType', 'El nombre de tipo de producto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createProductExpense
);

router.put('/', updateProductExpense)

router.delete('/', deleteProductExpense)

module.exports = router;