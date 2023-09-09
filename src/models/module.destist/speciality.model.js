const { Schema, model } = require('mongoose');

const SpecialitySchema = Schema({
  Name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  State: {
    type: Boolean,
    default : true,
  },
});

SpecialitySchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Speciality', SpecialitySchema);

