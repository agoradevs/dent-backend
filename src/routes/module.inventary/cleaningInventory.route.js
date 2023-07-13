const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getCleaningInventory , createCleaningInventory,updateCleaningInventory,deleteCleaningInventory  } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getCleaningInventory)

router.post(
    '/',
    [
        check('productExpense', 'El producto gastado es necesario').not().isEmpty(),
        check('units', 'Las unidades del producto gastado es necesario').not().isEmpty(),
        check('description', 'La descripcion del producto gastado es necesario').not().isEmpty(),
        validarCampos
    ],
    createCleaningInventory
);

router.put('/', updateCleaningInventory)

router.delete('/', deleteCleaningInventory)

module.exports = router;