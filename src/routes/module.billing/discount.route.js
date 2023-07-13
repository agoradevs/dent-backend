const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getDiscounts, createDiscount, updateDiscount, deleteDiscount } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');
const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getDiscounts)

router.post(
    '/',
    [
        check('accountUser', 'La cuenta a la que se hace el descuento es obligatoria').not().isEmpty(),
        check('typeDiscounts')
            .isArray({min : 1})
            .withMessage('Tiene que tener al menos una tipo de descuento')
            .notEmpty()
            .withMessage('El campo de tipo de descuento no puede estar vacio')
        ,
        validarCampos
    ],
	createDiscount
);


// editar tipo de usuario
router.put('/', updateDiscount);

router.delete('/', deleteDiscount);

module.exports = router;