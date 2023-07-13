const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('./../../middlewares');
// const { roleExists } = require('./../../helpers');
const { getRoles, createRol, updateRol, deleteRol, dropRol } = require('./../../controllers');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

// Obtener roles
router.get('/', getRoles);

//Crear nuevo rol
router.post(
    '/',
    [
		check('name', 'El nombre del permiso es obligatorio').not().isEmpty(),
        check('permissions')
			.isArray({min : 1})
			.withMessage('Debe tener al menos un permiso')
			.notEmpty()
			.withMessage('El campo no puede estar vacio')
		,
        validarCampos
    ],
    createRol
);

//Editar rol
router.put('/', updateRol);

//Eliminar rol
router.delete('/', deleteRol);
router.delete('/drop', dropRol);

module.exports = router;