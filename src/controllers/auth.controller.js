const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { AcountUserSchema } = require('../models');


const loginUsuario = async (req, res = response) => {
    console.log('login', req.body)
    const { userName, password } = req.body;

    try {

        const cuenta = await AcountUserSchema.findOne({ userName });

        if (!cuenta) {
            return res.status(400).json({
                errors: [{ msg: "El usuario no existe con ese correo" }]
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, cuenta.password);

        if (!validPassword) {
            return res.status(400).json({
                errors: [{ msg: "Password incorrecto" }]
            });
        }

        // Generar JWT
        const token = await generarJWT(cuenta.id, cuenta.userName);

        res.json({
            ok: true,
            uid: cuenta.id,
            name: cuenta.userName,
            users: cuenta.users,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }
}


const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    loginUsuario,
    revalidarToken
}