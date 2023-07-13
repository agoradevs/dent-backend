const { response } = require('express');
const { PermissionsSchema } = require('./../../models');

const getPermissions = async (req, res = response) => {

    try {
        const permissions = await PermissionsSchema.find({state : true})
            .select('name')
        ;

        res.json({
            ok: true,
            permissions
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createPermission = async (req, res = response) => {

    const permission = new PermissionsSchema(req.body);

    try {
        const permissionSave = await permission.save();

        res.json({
            ok: true,
            permission: permissionSave
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updatePermission = async (req, res = response) => {

    const permissionId = req.query.id;

    try {

        const newPermission = {
            ...req.body
        }

        const permissionUpdate = await PermissionsSchema.findByIdAndUpdate(
            permissionId, 
            newPermission, 
            { new: true }
        );


        res.json({
            ok: true,
            permission: permissionUpdate
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deletePermission = async (req, res = response) => {

    const permissionId = req.query.id;
    try {
        const permission = await PermissionsSchema.findById(permissionId)

        let newPermission = { ...permission }
        newPermission._doc.state = false;

        const permissionDelete = await PermissionsSchema.findByIdAndUpdate(
            permissionId, 
            newPermission, 
            { new: true })
        ;

        res.json({
            ok: true,
            permissionDelete
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const dropPermission = async (req, res = response) => {

    const permissionId = req.query.id;
    try {

        await PermissionsSchema.findByIdAndDelete(permissionId);

        res.json({
            ok: true,
            permissionDelete : "Permiso eliminado"
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
    getPermissions,
    createPermission,
    updatePermission,
    deletePermission,
    dropPermission
}