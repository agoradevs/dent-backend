const { response } = require('express');
const { UserSchema } = require('../../models');

const getUsers = async (req, res = response) => {

    const usuarios = await UserSchema.find()
        .populate({
            path : 'roles',
            select : ' name',
            populate : {
                path : 'permissions',
                select : 'name'
            }
        })
        .populate('typeUser' , 'name')
    ;

    res.json({
        ok: true,
        usuarios
    });
}

const createUser = async (req, res = response) => {

    const user = new UserSchema(req.body);
    try {

        const userSave = await user.save();
        const userWithRef = await UserSchema.findById(userSave.id)
            .select('name')
            .select('lastName')
            .select('email')
            .select('phoneNumber')
            .select('CI')
            .select('age')
            .populate('roles', 'name')
            .populate('typeUser', 'name')
        ;

        res.json({
            ok: true,
            user: userWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateUser = async (req, res = response) => {

    const userId = req.query.id;

    try {

        const newUser = {
            ...req.body
        }

        const userUpdate = await UserSchema.findByIdAndUpdate(userId, newUser, { new: true },);

        const userWithRef = await UserSchema.findById(userUpdate.id)
            .select('name')
            .select('lastName')
            .select('email')
            .select('phoneNumber')
            .select('CI')
            .select('age')
            .populate('roles', 'name')
            .populate('typeUser', 'name')
		;

        res.json({
            ok: true,
            usuario: userWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteUser = async (req, res = response) => {

    const userId = req.query.id;

    try {
        const user = await UserSchema.findById(userId);

        let newUser = { ...user }
        newUser._doc.state = false;

        const userDelete = await UserSchema.findByIdAndUpdate(userId, newUser, { new: true },);
        const userWithRef = await UserSchema.findById(userDelete.id)
            .select('name')
            .select('lastName')
            .populate('roles' , 'name')
        ;

        res.json({
            ok: true,
            user: userWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}