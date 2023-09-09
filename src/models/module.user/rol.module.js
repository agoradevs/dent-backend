const { Schema, model } = require('mongoose');

const RolSchema = Schema({
  Name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  ManageUsers : {
    type : Boolean,
    default : 0,
  },
  ManageDentists : {
    type : Boolean,
    default : 0,
  },
  ManageAccount : {
    type : Boolean,
    default : 0,
  },
  ManagePatients : {
    type : Boolean,
    default : 0,
  },
  ManageAppoitments : {
    type : Boolean,
    default : 0,
  },
  ManageMedicalHistory : {
    type : Boolean,
    default : 0,
  },
  ManagePayments : {
    type : Boolean,
    default : 0,
  },
  ManageMaterial : {
    type : Boolean,
    default : 0,
  },
  ChangeShedule : {
    type : Boolean,
    default : 0,
  },
  State: {
    type: Boolean,
    default : true,
  },
});

RolSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Rol', RolSchema);

