const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getAppoitments, createAppoitment, updateAppoitment, deleteAppoitment } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getAppoitments)

router.post(
    '/',
    [
        check('assistant', 'El id del asistente es obligatorio').not().isEmpty(),
        check('treatment', 'El id del tratamiento es obligatorio').not().isEmpty(),
        check('appoitmentDate', 'La fecha de la cita es obligatorio').not().isEmpty(),
        check('duration', 'La duración de la cita es obligatoria').not().isEmpty(),
        validarCampos
    ],
	createAppoitment
);


// editar tipo de usuario
router.put('/', updateAppoitment);

router.delete('/', deleteAppoitment);

module.exports = router;