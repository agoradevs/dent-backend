const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getSpecialities,updateSpeciality,createSpeciality,deleteSpeciality } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getSpecialities)

router.post(
    '/',
    [
        check('name', 'La especialidad es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createSpeciality
);

router.put('/', updateSpeciality)

router.delete('/', deleteSpeciality)

module.exports = router;