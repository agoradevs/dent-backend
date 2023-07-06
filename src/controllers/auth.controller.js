const { response } = require('express');
const bcrypt = require('bcryptjs');
const UserSchema = require('./../models/module.user/AccountUser.model');
const { generarJWT } = require('../helpers/jwt');


const loginUsuario = async (req, res = response) => {
    console.log('login', req.body)
    const { name, password } = req.body;

    try {

        const usuario = await UserSchema.findOne({ userName: name })
            .populate('user', 'userName')
            .populate('typeAcount', 'userName');

        if (!usuario) {
            return res.status(400).json({
                errors: [{ msg: "El usuario no existe con ese correo" }]
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                errors: [{ msg: "Password incorrecto" }]
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.userName);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.userName,
            users: usuario.users,
            type_user: usuario.typeAcount.name,
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