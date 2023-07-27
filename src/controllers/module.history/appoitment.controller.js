const { response } = require('express');
const { AppoitmentSchema } = require('./../../models');

const getAppoitments = async (req, res = response) => {
    try {
        const appoitments = await AppoitmentSchema.find({state : true})
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
            appoitments
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

    const appoitmentId = req.query.id;

    try {
        const newAppoitment = {
            ...req.body
        }

        const appoitmentUpdate = await AppoitmentSchema.findByIdAndUpdate(
			appoitmentId, newAppoitment, { new: true }
		);

        res.json({
            ok: true,
            appoitment : appoitmentUpdate
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

    const appoitmentId = req.query.id;

    try {
        const appoitment = await AppoitmentSchema.findById(appoitmentId)

        const newAppoitment = { ...appoitment }
        newAppoitment._doc.state = false;

        const appoitmentDelete = await AppoitmentSchema.findByIdAndUpdate(
			appoitmentId, newAppoitment, { new: true }
		);

        res.json({
            ok: true,
            appoitment : appoitmentDelete
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