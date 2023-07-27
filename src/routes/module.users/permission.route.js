const { Router } = require('express');

const { check } = require('express-validator');
const { 
    validarCampos, validarJWT, PermissionPermissions 
} = require('../../middlewares');

const { 
    getPermissions, createPermission, updatePermission, deletePermission, dropPermission  
} = require('../../controllers');


const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/' ,getPermissions)

router.post(
    '/',
    [
        check('name', 'El nombre del permiso es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createPermission
);

router.put('/', updatePermission);

router.delete('/', deletePermission);
router.delete('/drop', dropPermission);

module.exports = router;