const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getTypesAcounts, createTypeAcount, updateTypeAcount, deleteTypeAcount } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
// router.use(validarJWT);

router.get('/', getTypesAcounts)

router.post(
    '/',
    [
        check('name', 'El nombre de tipo de cuenta es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createTypeAcount
);

router.put('/', 
    [
        check('name', 'El nombre de tipo de cuenta es obligatorio').not().isEmpty(),
        validarCampos
    ],
	updateTypeAcount
);

router.delete('/', deleteTypeAcount);

module.exports = router;