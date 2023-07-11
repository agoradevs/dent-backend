
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getInventoryDentist,createInventoryDentist,updateInventoryDentist,deleteInventoryDentist} = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
// router.use(validarJWT);

router.get('/', getInventoryDentist)

router.post(
    '/',
    [
        check('products', 'El nombre de tipo de producto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createInventoryDentist
);

router.put('/', updateInventoryDentist)

router.delete('/', deleteInventoryDentist)

module.exports = router;