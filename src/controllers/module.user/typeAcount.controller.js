const { response } = require('express');
const { TypeAcountSchema } = require('./../../models');

const getTypesAcounts = async (req, res = response) => {

    try {
        const typesAcount = await TypeAcountSchema.find({state : true})

        res.json({
            ok: true,
            typesAcount
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createTypeAcount = async (req, res = response) => {

    const typeAcount = new TypeAcountSchema(req.body);

    try {
        const typeAcountSave = await typeAcount.save();

        res.json({
            ok: true,
            permission: typeAcountSave
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updateTypeAcount = async (req, res = response) => {

    const typeAcountId = req.query.id;

    try {

        const newTypeAcount = {
            ...req.body
        }

        const typeAccountUpdate = await TypeAcountSchema.findByIdAndUpdate(
            typeAcountId,
            newTypeAcount, 
            { new: true }
        );


        res.json({
            ok: true,
            type_acount: typeAccountUpdate
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteTypeAcount = async (req, res = response) => {

    const typeAccountId = req.query.id;
    try {
        const typeAcount = await TypeAcountSchema.findById(typeAccountId)

        let newTypeAcount = { ...typeAcount }
        newTypeAcount._doc.state = false;

        const typeAcountDelete = await TypeAcountSchema.findByIdAndUpdate(
            typeAccountId, 
            newTypeAcount, 
            { new: true })
        ;

        res.json({
            ok: true,
			typeAcountDelete
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
	getTypesAcounts,
    createTypeAcount,
    updateTypeAcount,
    deleteTypeAcount
}