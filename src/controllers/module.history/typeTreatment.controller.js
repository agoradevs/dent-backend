const { response } = require('express');
const { TypeTreatmentSchema } = require('./../../models');

const getTypeTreatments = async (req, res = response) => {
    try {

        const typeTreatments = await TypeTreatmentSchema.find({ state: true })
			.select('name')
			.select('cost')
			.select('perTooth')
		;

        res.json({
            ok: true,
            typeTreatments
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }
}

const createTypeTreatment = async (req, res = response) => {

    const typeTreatment = new TypeTreatmentSchema(req.body);

    try {

        const typeTreatmentSave = await typeTreatment.save();
        const typeTreatmentWithRef = await TypeTreatmentSchema.findById(typeTreatmentSave.id)
			.select('name')
			.select('cost')
			.select('perTooth')
		;

        res.json({
            ok: true,
            typeTreatment : typeTreatmentWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }
}
const updateTypeTreatment = async (req, res = response) => {

    const typeTreatmentId = req.query.id;

    try {
        const newtypeTreatment = {
            ...req.body
        }

        const typeTreatmentUpdate = await TypeTreatmentSchema.findByIdAndUpdate(
			typeTreatmentId, newtypeTreatment, { new: true }
		);

        res.json({
            ok: true,
            typeTreatment : typeTreatmentUpdate
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteTypeTreatment = async (req, res = response) => {

    const typeTreatmentId = req.query.id;

    try {
        const typeTreatment = await TypeTreatmentSchema.findById(typeTreatmentId)

        let newtypeTreatment = { ...typeTreatment }
        newtypeTreatment._doc.state = false;

        const typeTreatmentDelete = await TypeTreatmentSchema.findByIdAndUpdate(
			typeTreatmentId, newtypeTreatment, { new: true }
		);

        res.json({
            ok: true,
            typeTreatment : typeTreatmentDelete
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
    getTypeTreatments,
    createTypeTreatment,
    updateTypeTreatment,
    deleteTypeTreatment
}