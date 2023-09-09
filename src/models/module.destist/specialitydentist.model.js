const { Schema, model } = require('mongoose');

const SpecialityDentistSchema = Schema({
  Dentist: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: [true, 'El dentista asignado es obligatorio'],
  },
  Speciality: {
		type: Schema.Types.ObjectId,
		ref: 'Speciality',
		required: [true, 'La especialidad es obligatorio'],
  },
  State: {
    type: Boolean,
    default : true,
  },
});

SpecialityDentistSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('SpecialityDentist', SpecialityDentistSchema);

