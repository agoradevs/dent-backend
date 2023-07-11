const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getCleaningInventory , createCleaningInventory,updateCleaningInventory,deleteCleaningInventory  } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
// router.use(validarJWT);

router.get('/', getCleaningInventory)

router.post(
    '/',
    [
        check('productExpense', 'El datos del producto son importantes').not().isEmpty(),
        validarCampos
    ],
    createCleaningInventory
);

router.put('/', updateCleaningInventory)

router.delete('/', deleteCleaningInventory)

module.exports = router;