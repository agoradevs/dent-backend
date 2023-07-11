const { response } = require('express');
const { AppoitmentSchema } = require('./../../models');

const getAppoitments = async (req, res = response) => {
    try {
        const treatments = await AppoitmentSchema.find({state : true})
			.select('duration')
			.select('stateAppoitment')
            .select('appoitmentDate')
			.populate('assistant' , 'name')
			.populate({
				path : 'treatment',
				select : 'cost teeths',
                populate : {
                    path : 'typeTreatment',
                    select : 'name'
                }
			})
		;

        res.json({
            ok: true,
            treatments
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }
}
const createAppoitment = async (req, res = response) => {

    const appoitment = new AppoitmentSchema(req.body);

    try {

        const appoitmentSave = await appoitment.save();
        const appoitmentWithRef = await AppoitmentSchema.findById(appoitmentSave.id)
			.select('duration')
			.select('stateAppoitment')
            .select('appoitmentDate')
			.populate('assistant' , 'name')
			.populate({
				path : 'treatment',
				select : 'cost teeths',
                populate : {
                    path : 'typeTreatment',
                    select : 'name'
                }
			})
		;

        res.json({
            ok: true,
            appoitment : appoitmentWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }
}
const updateAppoitment = async (req, res = response) => {

    const treatmentId = req.query.id;

    try {
        const newTreatment = {
            ...req.body
        }

        const treatmentUpdate = await AppoitmentSchema.findByIdAndUpdate(
			treatmentId, newTreatment, { new: true }
		);

        res.json({
            ok: true,
            treatment : treatmentUpdate
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteAppoitment = async (req, res = response) => {

    const treatmentId = req.query.id;

    try {
        const treatment = await AppoitmentSchema.findById(treatmentId)

        let newTreatment = { ...treatment }
        newTreatment._doc.state = false;

        const treatmentDelete = await AppoitmentSchema.findByIdAndUpdate(
			treatmentId, newTreatment, { new: true }
		);

        res.json({
            ok: true,
            treatment : treatmentDelete
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
    getAppoitments,
    createAppoitment,
    updateAppoitment,
    deleteAppoitment
}