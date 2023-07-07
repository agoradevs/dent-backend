const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getTypeUsers, createTypeUser, updateTypeUser, deleteTypeUser  } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
// router.use(validarJWT);

router.get('/', getTypeUsers)

router.post(
    '/',
    [
        check('name', 'El nombre de tipo de usuario es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createTypeUser
);

router.put('/', updateTypeUser)

router.delete('/', deleteTypeUser)

module.exports = router;