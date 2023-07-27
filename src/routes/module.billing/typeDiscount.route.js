const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { 
	getTypeDiscounts, createTypeDiscount, updateTypeDiscount, deleteTypeDiscount 
} = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');
const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getTypeDiscounts)

router.post(
    '/',
    [
        check('typeAccounts')
            .isArray({min : 1})
            .withMessage('Tiene que tener al menos una tipo de cuenta para crear un descuento')
            .notEmpty()
            .withMessage('El campo de tipo de cuenta no puede estar vacio')
        ,
        check('name', 'El nombre del tipo de cuenta es obligatorio').not().isEmpty(),
        check('discountRate', 'El cantidad de descuento es obligatorio').not().isEmpty(),
        validarCampos
    ],
	createTypeDiscount
);


// editar tipo de usuario
router.put('/', updateTypeDiscount);

router.delete('/', deleteTypeDiscount);

module.exports = router;