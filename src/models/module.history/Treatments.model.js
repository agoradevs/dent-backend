const { Schema, model } = require('mongoose');

const TreatmentsSchema = Schema({
  Dentist: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: [true, 'El dentista asignado es obligatorio'],
  },
  TypeTreatment : {
    type : Schema.Types.ObjectId,
    ref : 'TypeTreatment',
    required : [true, 'El tipo de tratamiento para este tratamiento es obligatorio'],
  },
  Patient : {
    type: Schema.Types.ObjectId,
    ref: 'Patients',
    required: [true, 'El paciente es obligatorio'],
  },
	Teeths: [{
		type: String,
		required: [true, 'Los dientes son obligatorios'],
	}],
	TreatmentTime: {
		type: Number,
		default : 1,
	},
	State: {
		type: String,
    default : 'Inicio',
	},
});

TreatmentsSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Treatments', TreatmentsSchema);

