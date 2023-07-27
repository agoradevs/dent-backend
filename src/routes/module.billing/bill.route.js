const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { getBills, createBill, updateBill, deleteBill } = require('../../controllers');
const { validarJWT } = require('../../middlewares/validar-jwt');
const router = Router();
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getBills);

router.post(
    '/',
    [
        check('assistant', 'El asistente que hace la factura es obligatorio').not().isEmpty(),
        check('treatment', 'El tratamiento a pagar debe ser especificado').not().isEmpty(),
		check('paid','El pago es obligatorio').not().isEmpty(),
		check('paymentMethod','El metodo de pago es obligatorio').not().isEmpty(),
        validarCampos
    ],
	createBill
);


// editar tipo de usuario
router.put('/', updateBill);

router.delete('/', deleteBill);

module.exports = router;