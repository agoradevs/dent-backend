
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { loginUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/',
    [
        check('name', 'El nombre de usuario es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 8 caracteres minimo').isLength({ min: 8}),
        check('password', 'El password debe de ser de 15 caracteres maximo').isLength({ max: 15}),
        validarCampos
    ],
    loginUsuario
);


router.get('/renew', validarJWT, revalidarToken);


module.exports = router;