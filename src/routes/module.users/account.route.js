const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getAccounts, createAccount, updateAccount, deleteAccount } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getAccounts)

router.post(
    '/',
    [
        check('rol' , 'El rol es obligatorio').not().isEmpty(),
        check('users')
            .isArray({min : 1})
            .withMessage('Tiene que tener al menos 1 usuario')
            .notEmpty()
            .withMessage('El campo de usuarios no puede estar vacio')
        ,
        check('typeAccount', 'El tipo de cuenta es obligatorio').not().isEmpty(),
        check('userName', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        validarCampos
    ],
	createAccount
);


// editar tipo de usuario
router.put('/', updateAccount);

router.delete('/', deleteAccount);

module.exports = router;