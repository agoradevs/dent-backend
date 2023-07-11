const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getTypeTreatments, createTypeTreatment, 
    updateTypeTreatment, deleteTypeTreatment } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
// router.use(validarJWT);

router.get('/', getTypeTreatments)

router.post(
    '/',
    [
        check('name', 'El nombre del tipo de tratamiento es obligatorio').not().isEmpty(),
        check('cost', 'El costo del tratamiento tambien es obligatorio').not().isEmpty(),
        check('perTooth', 'Es necesario saber si el tratamiento es por diente').not().isEmpty(),
        validarCampos
    ],
	createTypeTreatment
);


// editar tipo de usuario
router.put('/', updateTypeTreatment);

router.delete('/', deleteTypeTreatment);

module.exports = router;