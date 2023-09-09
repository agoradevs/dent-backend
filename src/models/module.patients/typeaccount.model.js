const { Schema, model } = require('mongoose');

const TypesAccountSchema = Schema({
  Name : {
    type : String,
    required : [true, 'El nombre es obligatorio'],
  },
  AllowedUsers : {
    type: Number,
    default : 1,
  },
  State : {
    type : Boolean,
    default : true,
  },
});

TypesAccountSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('TypesAccount', TypesAccountSchema);

