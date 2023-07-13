const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getTypeProducts, createTypeProducts, updateTypeProduct, deleteTypeProduct  } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getTypeProducts)

router.post(
    '/',
    [
        check('name', 'El nombre de tipo de producto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createTypeProducts
);

router.put('/', updateTypeProduct)

router.delete('/', deleteTypeProduct)

module.exports = router;