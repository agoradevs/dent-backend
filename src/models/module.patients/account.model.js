const { Schema, model } = require('mongoose');

const AccountSchema = Schema({
  Patients : [{
    type: Schema.Types.ObjectId,
    ref: 'Patients',
    required: [true, 'Los pacientes en una cuenta es obligatorio'],
  }],
  TypeAccount : {
    type: Schema.Types.ObjectId,
    ref: 'TypesAccount',
    required: [true, 'El tipo de cuenta es obligatorio'],
  },
  Name : {
    type : String,
    required : [true, 'El nombre es obligatorio'],
  },
  Password : {
    type : String,
    required : [true, 'La contraseña es obligatoria'],
  },
  Email : {
    type : String,
    default : 'No tiene email',
  },
  State : {
    type : Boolean,
    default : true,
  },
});

AccountSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Account', AccountSchema);

