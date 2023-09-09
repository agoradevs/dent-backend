const { Schema, model } = require('mongoose');

const PatientsSchema = Schema({
  FirstName : {
    type : String,
    required : [true, 'Los nombres del paciente son obligatorios'],
  },
  LastName : {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  Age : {
    type : Number,
    required : [true, 'La edad del paciente es obligatoria'],
  },
  PhoneNumber : {
    type : String,
    default : 'No tiene número de celular',
    unique : true,
  },
	Perfil :{
		type : String,
		data : Buffer,
		default : 'No tiene foto de perfil',
	},
  CI : {
    type : String,
    required : [true, 'El carnet de indetidad es obligatorio'],
    unique : true,
  },
  State : {
    type : Boolean,
    default : true,
  },
});

PatientsSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Patients', PatientsSchema);

