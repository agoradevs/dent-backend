
const { Router } = require('express');
const { check } = require('express-validator');
// const { validarCampos } = require('../middlewares/validar-campos');
const { loginUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        // validarCampos
    ],
    loginUsuario
);


router.get('/renew', validarJWT, revalidarToken);




module.exports = router;