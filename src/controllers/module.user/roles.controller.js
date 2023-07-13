const { response } = require('express');
const { RolesSchema } = require('./../../models');

const getRoles = async (req, res = response) => {
    try {

        const roles = await RolesSchema.find({ state: true })
			.select('name')
            .populate('permissions', 'name')

        res.json({
            ok: true,
            roles
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }
}

const createRol = async (req, res = response) => {

    const rol = new RolesSchema(req.body);

    try {

        const roleSave = await rol.save();
        const roleWithRef = await RolesSchema.findById(roleSave.id)
			.select('name')
            .populate('permissions' , 'name')
		;

        res.json({
            ok: true,
            role: roleWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }
}
const updateRol = async (req, res = response) => {

    const rolId = req.query.id;

    try {
        const newRole = {
            ...req.body
        }

        const roleUpdate = await RolesSchema.findByIdAndUpdate(rolId, newRole, { new: true });
        const roleWithRef = await RolesSchema.findById(roleUpdate.id)
			.select('name')
            .populate('permissions', 'name')
		;

        res.json({
            ok: true,
            role: roleWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteRol = async (req, res = response) => {

    const rolId = req.query.id;

    try {
        const role = await RolesSchema.findById(rolId)

        let newRole = { ...role }
        newRole._doc.state = false;

        const roleDelete = await RolesSchema.findByIdAndUpdate(rolId, newRole, { new: true });
        const roleWithRef = await RolesSchema.findById(roleDelete.id)
            .select('name')
            .populate('permissions', 'name')

        res.json({
            ok: true,
            role: roleWithRef
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const dropRol = async (req, res = response) => {

    const rolId = req.query.id;

    try {

        await RolesSchema.findByIdAndDelete(rolId);

        res.json({
            ok: true,
            role: "El rol a sido eliminado correctamente"
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
    getRoles,
    createRol,
    updateRol,
    deleteRol,
    dropRol
}