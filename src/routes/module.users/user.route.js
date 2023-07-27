const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getUsers, createUser, updateUser, deleteUser } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const { emailExists } = require("../../helpers/db-validators");
const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getUsers)

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check("email").custom(emailExists),
        check('phoneNumber', 'El numero de celular es obligatorio').not().isEmpty(),
        check('CI', 'El carnet de identidad es obligatorio').not().isEmpty(),
        check('age', 'La edad del usuario es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createUser
);


// editar tipo de usuario
router.put('/', updateUser);

router.delete('/', deleteUser);

module.exports = router;