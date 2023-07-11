const { response } = require('express');
const { TypeUserSchema } = require('./../../models');

const getTypeUsers = async (req, res = response) => {

    try {
        const typeUsers = await TypeUserSchema.find({state : true})

        res.json({
            ok: true,
            typeUsers
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createTypeUser = async (req, res = response) => {

    const typeUser = new TypeUserSchema(req.body);

    try {
        const typeUserSave = await typeUser.save();

        res.json({
            ok: true,
            typeUser: typeUserSave,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updateTypeUser = async (req, res = response) => {

    const typeUserId = req.query.id;

    try {

        const newTypeUser = {
            ...req.body
        }

        const typeUserUpdate = await TypeUserSchema.findByIdAndUpdate(
            typeUserId, newTypeUser, { new: true },);

        res.json({
            ok: true,
            typeUser: typeUserUpdate
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteTypeUser = async (req, res = response) => {

    const typeUserId = req.query.id;
    try {
        const typeUser = await TypeUserSchema.findById(typeUserId)

        let newTypeUser = { ...typeUser }
        newTypeUser._doc.state = false;

        const typeUserDelete = await TypeUserSchema.findByIdAndUpdate(typeUserId, newTypeUser, { new: true });

        res.json({
            ok: true,
            typeUserDelete
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
    getTypeUsers,
    createTypeUser,
    updateTypeUser,
    deleteTypeUser
}