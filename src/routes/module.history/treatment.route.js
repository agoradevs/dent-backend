const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getTreatments, createTreatment, updateTreatment, deleteTreatment } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getTreatments)

router.post(
    '/',
    [
        check('patient', 'El id del paciente es obligatorio').not().isEmpty(),
        check('dentist', 'El id del dentista es obligatorio').not().isEmpty(),
        check('typeTreatment', 'El costo del tratamiento tambien es obligatorio').not().isEmpty(),
        check('teeths', 'Es necesario saber si el tratamiento es por diente')
			.isArray({min : 1 })
			.withMessage('Minimo se debe tener 1 diente en el tratamiento')
		,
        validarCampos
    ],
	createTreatment
);


// editar tipo de usuario
router.put('/', updateTreatment);

router.delete('/', deleteTreatment);

module.exports = router;