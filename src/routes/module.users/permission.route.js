const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getPermissions, createPermission, updatePermission, deletePermission  } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
// router.use(validarJWT);

router.get('/', getPermissions)

router.post(
    '/',
    [
        check('name', 'El nombre del permiso es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createPermission
);

router.put('/',
    [
        check('name', 'El nombre del permiso es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updatePermission
);

router.delete('/', deletePermission);

module.exports = router;