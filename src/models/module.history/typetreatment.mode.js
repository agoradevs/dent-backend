const { Schema, model } = require('mongoose');

const TypeTreatmentSchema = Schema({
  Name: {
		type: String,
		required: [true, 'El nombre es obligatorio'],
  },
  Cost : {
    type: Number,
    deafult : 0,
  },
	State: {
    type: Boolean,
    deafult : true,
	},
});

TypeTreatmentSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('TypeTreatment', TypeTreatmentSchema);

