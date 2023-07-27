const { response } = require('express');
const { TreatmentsSchema, typeTreatment, TypeTreatmentSchema } = require('./../../models');

const getTreatments = async (req, res = response) => {
    try {
        const treatments = await TreatmentsSchema.find({state : true})
			.select('name')
			.select('cost')
			.select('teeths')
			.select('state')
			.select('completedDays')
			.populate('typeTreatment' , 'name')
			.populate('patient' , 'name lastName age')
			.populate({
				path : 'dentist',
				select : 'name lastName'
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
const createTreatment = async (req, res = response) => {

    const treatment = new TreatmentsSchema(req.body);
    
    try {

        // Evaluando si el costo del tratamiento
        const typeTreatment = await TypeTreatmentSchema.findById(treatment.typeTreatment);
        const cost = typeTreatment.cost;
        treatment.cost = typeTreatment.perTooth ? cost * treatment.teeths.length : cost;

        const treatmentSave = await treatment.save();
        const treatmentWithRef = await TreatmentsSchema.findById(treatmentSave.id)
			.select('name')
			.select('teeths')
            .select('cost')
			.populate('typeTreatment' , 'name cost')
			.populate('patient' , 'name lastName age')
			.populate({
				path : 'dentist',
				select : 'name lastName'
			})
		;

        res.json({
            ok: true,
            treatment : treatmentWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }
}
const updateTreatment = async (req, res = response) => {

    const treatmentId = req.query.id;

    try {


        const newTreatment = {
            ...req.body
        }

        const treatmentUpdate = await TreatmentsSchema.findByIdAndUpdate(
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
const deleteTreatment = async (req, res = response) => {

    const treatmentId = req.query.id;

    try {
        const treatment = await TreatmentsSchema.findById(treatmentId)

        let newTreatment = { ...treatment }
        newTreatment._doc.state = false;

        const treatmentDelete = await TreatmentsSchema.findByIdAndUpdate(
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
    getTreatments,
    createTreatment,
    updateTreatment,
    deleteTreatment
}