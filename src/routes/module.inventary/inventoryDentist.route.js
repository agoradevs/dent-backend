
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getInventoryDentist,createInventoryDentist,updateInventoryDentist,deleteInventoryDentist} = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getInventoryDentist)

router.post(
    '/',
    [
        check('product', 'El producto es obligatorio').not().isEmpty(),
        check('units', 'La cantidad de unidades del producto es obligatorio').not().isEmpty(),
        check('appoitment', 'La cita donde se gasto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createInventoryDentist
);

router.put('/', updateInventoryDentist)

router.delete('/', deleteInventoryDentist)

module.exports = router;